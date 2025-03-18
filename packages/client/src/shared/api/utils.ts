import { ApiError } from './api-error'

export function convertApiErrorToPlainObjectOrNull(error: unknown) {
  if (error instanceof ApiError) {
    return {
      message: error.message,
      reason: error.reason,
      statusCode: error.statusCode,
    }
  }
  return null
}
