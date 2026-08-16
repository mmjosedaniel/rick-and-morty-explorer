export interface RawPgField {
  readonly name: string;
  readonly dataTypeID: number;
}

export interface RawPgResult {
  readonly command: string;
  readonly fields: readonly RawPgField[];
  readonly rows: readonly unknown[][];
}

export interface RawPgClient {
  readonly query: (config: {
    readonly text: string;
    readonly values?: readonly unknown[];
    readonly rowMode: "array";
    readonly query_timeout?: number;
  }) => Promise<RawPgResult>;
}

export interface SequelizeQueryBoundary {
  readonly query: (
    sql: string,
    options?: Readonly<Record<string, unknown>>,
  ) => Promise<unknown>;
}

export interface MigrationQueryInterface {
  readonly sequelize: SequelizeQueryBoundary;
}

export interface MigrationContext {
  readonly queryInterface: MigrationQueryInterface;
  readonly schema: string;
  readonly transaction: object;
}

export interface MigrationDefinition {
  readonly up: (options: {
    readonly context: MigrationContext;
  }) => Promise<void>;
  readonly down: (options: {
    readonly context: MigrationContext;
  }) => Promise<void>;
}

export interface MigrationTargetState {
  readonly host: "127.0.0.1";
  readonly port: number;
  readonly database: string;
  readonly schema: string;
  readonly user: string;
  readonly credential: string;
}
