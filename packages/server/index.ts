import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
import * as fs from 'node:fs'
import * as path from 'node:path'
import * as console from 'node:console'

async function startServer() {
  const app = express()
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001

  const distPath = path.dirname(require.resolve('client/dist/index.html'))
  const ssrClientPath = require.resolve('client/dist-ssr/client.cjs')

  app.use('/assets', express.static(path.resolve(distPath, 'assets')))

  app.use('*', async (_, res, next) => {
    try {
      const template = fs.readFileSync(
        path.resolve(distPath, 'index.html'),
        'utf-8'
      )

      const { render } = await import(ssrClientPath)
      const appHtml = render(template)

      const html = template.replace('<!--ssr-outlet-->', appHtml)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
