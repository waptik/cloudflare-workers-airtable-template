import { getMethod } from './utils/get-method'
import { getTarget } from './utils/get-target'
import { isAllowed } from './utils/is-allowed'
import { BaseServerRequest, Config } from './utils/types'

const config: Config = {
  airtableApiUrl: 'https://api.airtable.com',
  airtableBaseId: '',
  airtableApiVersion: 'v0',
  allowedTargets: '*',
  airtableApiKey: AIRTABLE_API_KEY,
  cacheTime: 0,
  prefix: '',
}

const parseJson = (obj: string) => {
  try {
    return JSON.parse(obj)
  } catch (e) {
    return obj
  }
}

/**
 * Check the api key in header an compare it
 * with the one save in our environment secrets
 *
 * @param req Request
 * @returns boolean
 */
function isAuthorizedRequest(req: BaseServerRequest) {
  const auth = req.headers.get('Authorization')

  if (!auth) {
    return false
  }

  const apiKey = auth.replace('Bearer ', '')

  return apiKey === config.airtableApiKey
}

export async function handleRequest(
  req: BaseServerRequest,
): Promise<{ headers: Headers; body: any }> {
  config.airtableBaseId = req.params.baseId
  const method = getMethod(req.method)
  const target = getTarget(req, config)

  let isOk = false

  if (isAuthorizedRequest(req)) {
    isOk = true
  }

  if (
    isAllowed(method, target.airtableResource, parseJson(config.allowedTargets))
  ) {
    isOk = true
  }

  if (!isOk) {
    throw new Error('Not Found')
  }

  const input = await req.body()

  const response = await fetch(target.airtableRequestUrl, {
    headers: {
      Authorization: `Bearer ${config.airtableApiKey}`,
      'Content-type': 'application/json',
    },
    method: method,
    body: JSON.stringify(input),
  })

  const body = await response.json()

  const headers = new Headers()
  for (const kv of response.headers.entries()) {
    headers.append(kv[0], kv[1])
  }
  headers.set('Cache-Control', 'max-age=' + config.cacheTime)

  return { body, headers }

  // return new Response(JSON.stringify(body), {
  //   status: response.status,
  //   statusText: response.statusText,
  //   headers: headers,
  // })

  // return new Response(`request method: ${req.method}`)
}
