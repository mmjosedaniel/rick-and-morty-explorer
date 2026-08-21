const defaultGraphqlEndpoint = "http://127.0.0.1:3000/graphql";
const configuredGraphqlEndpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT?.trim();

export const graphqlEndpoint =
  configuredGraphqlEndpoint === undefined || configuredGraphqlEndpoint === ""
    ? defaultGraphqlEndpoint
    : configuredGraphqlEndpoint;
