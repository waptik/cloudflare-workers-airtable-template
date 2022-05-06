import { Router } from 'worktop'
import { listen } from 'worktop/cache'
import * as CORS from 'worktop/cors'
import { handleRequest } from './handler'

const router = new Router()

/**
 * Handles `OPTIONS` requests using the same settings.
 * NOTE: Call `CORS.preflight` per-route for individual settings.
 */
router.prepare = CORS.preflight({
  origin: '*', // allow any `Origin` to connect
  headers: ['Cache-Control', 'Content-Type', 'X-Count'],
  methods: ['GET', 'POST'],
})

router.add('GET', '/greet/:name', (req, res) => {
  res.end(`Hello, ${req.params.name}!`)
})

// airtable enpoint
router.add('GET', '/v0/:baseId/:tableId', async (req, res) => {
  try {
    const { body, headers } = await handleRequest(req)

    for (const kv of headers.entries()) {
      res.setHeader(kv[0], kv[1])
    }

    return res.send(201, body)
  } catch (error) {
    console.error(error)
    return res.send(400, 'Bad Request')
  }
})

router.add('GET', '/', (req, res) => {
  const command = `$ curl https://${req.hostname}/greet/waptik`

  res.setHeader('Cache-Control', 'public,max-age=60')
  res.end(`Howdy~! Please greet yourself; for example:\n\n  ${command}\n`)
})

listen(router.run)
