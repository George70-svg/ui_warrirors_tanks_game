export function isHasMessageStringProp(
  obj: unknown
): obj is { message: string } {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'message' in obj &&
    typeof (obj as { message: unknown }).message == 'string'
  )
}

export function isGuardType<T>(type: T): type is T {
  return Boolean(type)
}

export function isErrorPlainObject(obj: unknown): obj is {
  message: string
  statusCode?: number
  reason?: string
} {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'message' in obj &&
    'statusCode' in obj &&
    'reason' in obj
  )
}
