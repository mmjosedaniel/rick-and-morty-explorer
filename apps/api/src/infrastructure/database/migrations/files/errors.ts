export class MigrationLifecycleError extends Error {
  readonly result: 1 | 2;

  constructor(message: string, result: 1 | 2 = 1, options?: ErrorOptions) {
    super(message, options);
    this.name = "MigrationLifecycleError";
    this.result = result;
  }
}
