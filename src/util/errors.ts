export class UserError extends Error {
  readonly statusCode: number;

  constructor(description: string, statusCode: number) {
    super(description);
    this.statusCode = statusCode;
  }
}
