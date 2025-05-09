export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: unknown) {
    super(400, message, details);
    this.name = "ValidationError";
  }
}

export class RateLimitError extends ApiError {
  constructor(message = "Too many requests") {
    super(429, message);
    this.name = "RateLimitError";
  }
}
