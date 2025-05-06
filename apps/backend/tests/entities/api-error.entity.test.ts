import { ApiError } from "../../src/entities/api-error.entity";

describe("ApiError", () => {
  it("should create an instance with default status 500", () => {
    const error = new ApiError("Something went wrong");

    expect(error).toBeInstanceOf(ApiError);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("Something went wrong");
    expect(error.status).toBe(500);
    expect(error.name).toBe("ApiError"); // Check that name is ApiError
  });

  it("should create an instance with a custom status code", () => {
    const error = new ApiError("Not Found", 404);

    expect(error.message).toBe("Not Found");
    expect(error.status).toBe(404);
  });

  it("should have correct prototype chain", () => {
    const error = new ApiError("Bad Request", 400);

    expect(Object.getPrototypeOf(error)).toBe(ApiError.prototype);
    expect(error instanceof Error).toBe(true);
    expect(error instanceof ApiError).toBe(true);
  });

  it("should preserve stack trace", () => {
    const error = new ApiError("Internal Error");

    expect(error.stack).toBeDefined();
    expect(typeof error.stack).toBe("string");
    expect(error.stack).toContain("ApiError");
  });
});
