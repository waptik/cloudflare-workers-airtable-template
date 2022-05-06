import { Allowed } from './types'

export function isAllowed(
  method: string,
  resource?: string,
  allowed?: Allowed,
): boolean {
  if (allowed === '*') {
    return true
  }

  if (
    method &&
    resource &&
    allowed &&
    Array.isArray(allowed) &&
    allowed.length
  ) {
    return !!allowed.find((item: { resource: string; method?: string }) => {
      if (item.resource === resource) {
        if (item.method === '*') {
          return true
        }
        if (item.method) {
          return !!item.method
            .split(',')
            .find((itemMethod: string) => itemMethod === method)
        }
      }
    })
  }

  return false
}
