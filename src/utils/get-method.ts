export function getMethod(method: Request['method']): string {
  return method && method.toUpperCase && method.toUpperCase()
}
