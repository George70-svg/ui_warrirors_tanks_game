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
