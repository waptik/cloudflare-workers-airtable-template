import { Router } from 'worktop'
import { listen } from 'worktop/cache'
import * as CORS from 'worktop/cors'
import * as Airtable from './handler'

const router = new Router()

/**
 * Handles `OPTIONS` requests using the same settings.
 * NOTE: Call `CORS.preflight` per-route for individual settings.
 */
router.prepare = CORS.preflight({
  origin: '*', // allow any `Origin` to connect
  headers: ['Cache-Control', 'Content-Type', 'X-Count'],
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
})

// airtable enpoints
router.add('GET', '/v0/:baseId/:tableId', Airtable.handleRequest)
router.add('POST', '/v0/:baseId/:tableId', Airtable.handleRequest)
router.add('PATCH', '/v0/:baseId/:tableId', Airtable.handleRequest)
router.add('PUT', '/v0/:baseId/:tableId', Airtable.handleRequest)
router.add('DELETE', '/v0/:baseId/:tableId', Airtable.handleRequest)

router.add('GET', '/', (req, res) => {
  const command = `$ curl https://${req.hostname}/greet/waptik`

  res.setHeader('Cache-Control', 'public,max-age=60')
  res.end(`Howdy~! Please greet yourself; for example:\n\n  ${command}\n`)
})

listen(router.run)
