export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public reason?: string
  ) {
    super(message)
  }
}
