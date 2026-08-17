import type { Request, RequestHandler, Response } from "express";

export interface RequestLogMetadata {
  operationName: string | null;
  errorCount: number;
}

export interface RequestLoggingDependencies {
  readonly write: (line: string) => void;
  readonly createRequestId: () => string;
  readonly now: () => number;
}

const requestLogMetadataKey = Symbol("requestLogMetadata");

type ResponseWithRequestLogMetadata = Response & {
  [requestLogMetadataKey]?: RequestLogMetadata;
};

function normalizeString(value: string, maximumBytes: number): string {
  let normalized = "";
  let byteLength = 0;

  for (const scalar of value) {
    const codePoint = scalar.codePointAt(0);
    const safeScalar =
      codePoint === undefined ||
      codePoint <= 0x1f ||
      (codePoint >= 0x7f && codePoint <= 0x9f) ||
      (codePoint >= 0xd800 && codePoint <= 0xdfff)
        ? "?"
        : scalar;
    const scalarByteLength = Buffer.byteLength(safeScalar, "utf8");

    if (byteLength + scalarByteLength > maximumBytes) {
      break;
    }

    normalized += safeScalar;
    byteLength += scalarByteLength;
  }

  return normalized;
}

function boundWholeNumber(value: number, minimum: number, maximum: number) {
  if (!Number.isFinite(value)) {
    return minimum;
  }

  return Math.min(maximum, Math.max(minimum, Math.trunc(value)));
}

export function getRequestLogMetadata(
  response: Response,
): RequestLogMetadata | undefined {
  return (response as ResponseWithRequestLogMetadata)[requestLogMetadataKey];
}

export function createRequestLogMiddleware(
  dependencies: RequestLoggingDependencies,
): RequestHandler {
  return (request: Request, response: Response, next) => {
    const start = dependencies.now();
    const requestId = dependencies.createRequestId();
    const method = request.method;
    const path = request.path;
    const metadata: RequestLogMetadata = {
      operationName: null,
      errorCount: 0,
    };
    const responseWithMetadata = response as ResponseWithRequestLogMetadata;
    responseWithMetadata[requestLogMetadataKey] = metadata;

    response.once("finish", () => {
      delete responseWithMetadata[requestLogMetadataKey];
      const record = {
        requestId: normalizeString(requestId, 64),
        method: normalizeString(method, 16),
        path: normalizeString(path, 240),
        status: boundWholeNumber(response.statusCode, 100, 999),
        durationMs: boundWholeNumber(
          dependencies.now() - start,
          0,
          2_147_483_647,
        ),
        errorCount: boundWholeNumber(metadata.errorCount, 0, 65_535),
        operationName:
          metadata.operationName === null
            ? null
            : normalizeString(metadata.operationName, 96),
      };

      dependencies.write(`${JSON.stringify(record)}\n`);
    });

    next();
  };
}
