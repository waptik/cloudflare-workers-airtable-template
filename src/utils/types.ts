import { Handler } from 'worktop'
import { ServerRequest } from 'worktop/request'

export type Config = {
  airtableApiUrl: string
  airtableBaseId: string
  airtableApiVersion: string
  allowedTargets: string
  airtableApiKey: string
  cacheTime: number
  prefix: string
}
export type Allowed = string | { resource: string; method?: string }[]
export interface GetTarget {
  airtableResource: string
  airtableResourceId: string
  airtableRequestUrl: string
}

interface RequestProps {
  //   name?: string
  [key: string]: string
  baseId: string
  tableId: string
}

export type BaseServerRequest = ServerRequest<RequestProps>
export type BaseHandler = Handler<RequestProps>
