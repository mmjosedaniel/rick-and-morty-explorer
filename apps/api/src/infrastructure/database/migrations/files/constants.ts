export const artifactSchemaVersion =
  "rick-and-morty-explorer:migration-artifact:v1";
export const migrationLockVersion = "v2" as const;
export const migrationLockLiteral =
  "rick-and-morty-explorer:migrations:v2";
export const migrationApplicationName =
  "rick-and-morty-explorer:migrations";
export const migrationIdPattern =
  /^[0-9]{14}-[a-z0-9]+(?:-[a-z0-9]+)*$/u;
export const identifierPattern = /^[a-z][a-z0-9_]{0,62}$/u;
