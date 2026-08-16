import { readFile } from "node:fs/promises";

import { expect, it } from "vitest";

const workflowUrl = new URL(
  "../../../../../.github/workflows/ci.yml",
  import.meta.url,
);

const workflowSteps = [
  {
    id: "infrastructure-config",
    fragment:
      "      - name: Validate infrastructure configuration\n        run: npm run infra:config",
  },
  {
    id: "infrastructure-start",
    fragment:
      "      - name: Start infrastructure\n        run: npm run infra:up",
  },
  {
    id: "infrastructure-health",
    fragment:
      "      - name: Inspect infrastructure health\n        run: npm run infra:ps",
  },
  {
    id: "root-test-suite",
    fragment: "      - name: Run test suite\n        run: npm test",
  },
  {
    id: "unconditional-infrastructure-teardown",
    fragment:
      "      - name: Tear down infrastructure\n        if: always()\n        run: npm run infra:down",
  },
] as const;

it(
  "starts healthy TASK-004 infrastructure before the CI test suite and always tears it down",
  async () => {
    const workflow = (await readFile(workflowUrl, "utf8")).replaceAll(
      "\r\n",
      "\n",
    );
    const mismatches: string[] = [];
    const positions = new Map<string, number>();

    for (const step of workflowSteps) {
      const first = workflow.indexOf(step.fragment);
      const last = workflow.lastIndexOf(step.fragment);

      if (first === -1 || first !== last) {
        mismatches.push(`${step.id}-unique`);
      } else {
        positions.set(step.id, first);
      }
    }

    const ordering = [
      ["infrastructure-config", "infrastructure-start", "config-before-start"],
      [
        "infrastructure-start",
        "infrastructure-health",
        "start-before-health",
      ],
      [
        "infrastructure-health",
        "root-test-suite",
        "health-before-test-suite",
      ],
      [
        "root-test-suite",
        "unconditional-infrastructure-teardown",
        "test-suite-before-teardown",
      ],
    ] as const;

    for (const [before, after, caseName] of ordering) {
      const beforePosition = positions.get(before);
      const afterPosition = positions.get(after);

      if (
        beforePosition !== undefined &&
        afterPosition !== undefined &&
        beforePosition >= afterPosition
      ) {
        mismatches.push(caseName);
      }
    }

    if (mismatches.length > 0) {
      throw new Error(
        `TASK_004_CI_INFRASTRUCTURE_ORDER_INVALID cases=${mismatches.join(",")}`,
      );
    }

    expect(positions.size).toBe(workflowSteps.length);
  },
);
