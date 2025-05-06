export class ApiError extends Error {
  public status: number;

  constructor(message: string, status: number = 500) {
    super(message);
    this.status = status;
    this.name = "ApiError";
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}