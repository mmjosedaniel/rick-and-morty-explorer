import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../api/src/transport/graphql/schema.ts",
  documents: "src/data/characters.graphql",
  generates: {
    "src/data/generated/graphql.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
      config: {
        useTypeImports: true,
      },
    },
  },
};

export default config;
