export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public data?: Record<string, unknown>
  ) {
    super(message)
  }
}
