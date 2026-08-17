import { describe, expect, it, vi } from "vitest";

import {
  createCharacterReadService,
  type CharacterReadRepository,
  type CharacterReadService,
} from "./character-read-service.js";
import { createLazyCharacterReadServiceOwner } from "../../runtime-composition.js";

interface CharacterOrigin {
  readonly name: string;
  readonly url: string;
}

interface CharacterDetail {
  readonly id: number;
  readonly name: string;
  readonly imageUrl: string;
  readonly species: string;
  readonly status: string;
  readonly gender: string;
  readonly type: string;
  readonly origin: CharacterOrigin;
  readonly isFavorite: boolean;
}

interface CharacterComment {
  readonly id: number;
  readonly body: string;
}

interface CommentPage {
  readonly limit: number;
  readonly offset: number;
}

interface CharacterDetailReadRepository extends CharacterReadRepository {
  findDetail(id: number): Promise<CharacterDetail | null>;
  listComments(
    characterId: number,
    page: CommentPage,
  ): Promise<readonly CharacterComment[]>;
}

interface CharacterDetailReadService extends CharacterReadService {
  detail(id: number): Promise<CharacterDetail | null>;
  comments(
    characterId: number,
    page: CommentPage,
  ): Promise<readonly CharacterComment[]>;
}

type CreateCharacterDetailReadService = (options: {
  readonly repository: CharacterDetailReadRepository;
}) => CharacterDetailReadService;

interface OwnedCharacterDetailReadService {
  readonly characterReadService: CharacterDetailReadService;
  close(): Promise<void>;
}

interface LazyCharacterDetailReadServiceOwner {
  readonly characterReadService: CharacterDetailReadService;
  close(): Promise<void>;
}

type CreateLazyCharacterDetailReadServiceOwner = (options: {
  readonly initialize: () => Promise<OwnedCharacterDetailReadService>;
}) => LazyCharacterDetailReadServiceOwner;

const createDetailReadService = createCharacterReadService as unknown as
  CreateCharacterDetailReadService;
const createLazyDetailReadServiceOwner =
  createLazyCharacterReadServiceOwner as unknown as
    CreateLazyCharacterDetailReadServiceOwner;

const detailFixture: CharacterDetail = {
  id: 1,
  name: "Rick Sanchez",
  imageUrl: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  species: "Human",
  status: "Alive",
  gender: "Male",
  type: "",
  origin: {
    name: "Earth (C-137)",
    url: "https://rickandmortyapi.com/api/location/1",
  },
  isFavorite: true,
};

const commentFixture: readonly CharacterComment[] = [
  { id: 7, body: "Newest comment" },
];

function createRepository(overrides: {
  readonly findDetail?: CharacterDetailReadRepository["findDetail"];
  readonly listComments?: CharacterDetailReadRepository["listComments"];
} = {}): CharacterDetailReadRepository {
  return {
    search: vi.fn(async () => []),
    findDetail:
      overrides.findDetail ?? vi.fn(async () => detailFixture),
    listComments:
      overrides.listComments ?? vi.fn(async () => commentFixture),
  };
}

function assertDetailOperations(
  service: CharacterReadService,
): asserts service is CharacterDetailReadService {
  const candidate = service as Partial<CharacterDetailReadService>;

  if (
    typeof candidate.detail !== "function" ||
    typeof candidate.comments !== "function"
  ) {
    throw new Error("TASK_006_CHARACTER_DETAIL_SERVICE_MISSING");
  }
}

describe("TASK-006 Milestone 4 character detail service", () => {
  it("coordinates detail and bounded comment reads while preserving results and failures", async () => {
    const valueRepository = createRepository();
    const valueService = createDetailReadService({
      repository: valueRepository,
    });
    assertDetailOperations(valueService);

    await expect(valueService.detail(1)).resolves.toBe(detailFixture);
    expect(valueRepository.findDetail).toHaveBeenCalledOnce();
    expect(valueRepository.findDetail).toHaveBeenCalledWith(1);

    const page = { limit: 20, offset: 0 };
    await expect(valueService.comments(1, page)).resolves.toBe(commentFixture);
    expect(valueRepository.listComments).toHaveBeenCalledOnce();
    expect(valueRepository.listComments).toHaveBeenCalledWith(1, page);

    const nullRepository = createRepository({
      findDetail: vi.fn(async () => null),
    });
    const nullService = createDetailReadService({ repository: nullRepository });
    assertDetailOperations(nullService);
    await expect(nullService.detail(999)).resolves.toBeNull();
    expect(nullRepository.findDetail).toHaveBeenCalledOnce();
    expect(nullRepository.findDetail).toHaveBeenCalledWith(999);

    const detailFailure = new Error("DETAIL_REPOSITORY_FAILURE");
    const failingDetailRepository = createRepository({
      findDetail: vi.fn(async () => {
        throw detailFailure;
      }),
    });
    const failingDetailService = createDetailReadService({
      repository: failingDetailRepository,
    });
    assertDetailOperations(failingDetailService);
    await expect(failingDetailService.detail(1)).rejects.toBe(detailFailure);
    expect(failingDetailRepository.findDetail).toHaveBeenCalledOnce();

    const commentFailure = new Error("COMMENT_REPOSITORY_FAILURE");
    const failingCommentRepository = createRepository({
      listComments: vi.fn(async () => {
        throw commentFailure;
      }),
    });
    const failingCommentService = createDetailReadService({
      repository: failingCommentRepository,
    });
    assertDetailOperations(failingCommentService);
    await expect(
      failingCommentService.comments(1, { limit: 50, offset: 3 }),
    ).rejects.toBe(commentFailure);
    expect(failingCommentRepository.listComments).toHaveBeenCalledOnce();
    expect(failingCommentRepository.listComments).toHaveBeenCalledWith(1, {
      limit: 50,
      offset: 3,
    });
  });

  it("forwards detail and comment reads through one lazy initialization", async () => {
    const detail = vi.fn(async () => detailFixture);
    const comments = vi.fn(async () => commentFixture);
    const closeResource = vi.fn(async () => {});
    const initializedService = {
      list: vi.fn(async () => []),
      detail,
      comments,
    } satisfies CharacterDetailReadService;
    const initialize = vi.fn(async () => ({
      characterReadService: initializedService,
      close: closeResource,
    }));
    const owner = createLazyDetailReadServiceOwner({ initialize });
    assertDetailOperations(owner.characterReadService);

    await expect(owner.characterReadService.detail(1)).resolves.toBe(
      detailFixture,
    );
    await expect(
      owner.characterReadService.comments(1, { limit: 20, offset: 0 }),
    ).resolves.toBe(commentFixture);

    expect(initialize).toHaveBeenCalledOnce();
    expect(detail).toHaveBeenCalledOnce();
    expect(detail).toHaveBeenCalledWith(1);
    expect(comments).toHaveBeenCalledOnce();
    expect(comments).toHaveBeenCalledWith(1, { limit: 20, offset: 0 });

    await owner.close();
    expect(closeResource).toHaveBeenCalledOnce();
  });
});
