import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "src/transport/graphql/schema.ts",
  generates: {
    "src/transport/graphql/generated/resolver-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../graphql-handler.js#GraphqlContext",
        immutableTypes: true,
        useTypeImports: true,
      },
    },
  },
};

export default config;
