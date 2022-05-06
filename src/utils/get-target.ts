import { BaseServerRequest, Config, GetTarget } from './types'

function getRequestUrl(
  resource: string,
  resourceId: string,
  config: Config,
  querystring: string,
) {
  const airtableBaseUrl =
    config.airtableApiUrl +
    '/' +
    config.airtableApiVersion +
    '/' +
    resource +
    '/' +
    resourceId

  return airtableBaseUrl + querystring
}

export function getTarget(req: BaseServerRequest, config: Config): GetTarget {
  const url = new URL(req.url)
  const airtableResource = req.params.baseId
  const airtableResourceId = req.params.tableId

  if (!airtableResourceId) {
    throw new Error('No resource found')
  }

  const airtableRequestUrl = getRequestUrl(
    airtableResource,
    airtableResourceId,
    config,
    url.search,
  )

  return {
    airtableResource,
    airtableResourceId,
    airtableRequestUrl,
  }
}
