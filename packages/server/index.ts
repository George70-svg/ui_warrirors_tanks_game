import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import * as fs from 'node:fs'
import * as path from 'node:path'
import * as console from 'node:console'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'
import * as process from 'node:process'
import { createProxyMiddleware } from 'http-proxy-middleware'
import cookieParser from 'cookie-parser'

dotenv.config()

const isDev = () => process.env.NODE_ENV === 'development'

async function startServer() {
  const app = express()
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001

  let vite: ViteDevServer | undefined
  let distPath: string | undefined
  let ssrClientPath: string | undefined

  if (!isDev()) {
    distPath = path.dirname(require.resolve('client/dist/index.html'))
    ssrClientPath = require.resolve('client/dist-ssr/client.cjs')
  }

  const srcPath = path.dirname(require.resolve('client'))

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  } else {
    app.use('/assets', express.static(path.resolve(distPath!, 'assets')))
  }

  app.use(
    '/api/v2',
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: { '*': '' },
      target: 'https://ya-praktikum.tech/api/v2',
      logger: console,
    })
  )

  // http://localhost:3001/profile
  // https://localhost:3001/api/v2/auth/user
  // https://ya-praktikum.tech/api/v2/auth/user
  app.use('*', cookieParser(), async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string
      if (!isDev()) {
        template = fs.readFileSync(
          path.resolve(distPath!, 'index.html'),
          'utf-8'
        )
      } else {
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')
        template = await vite!.transformIndexHtml(url, template)
      }

      let render: (
        req: unknown,
        apiConfig: string | undefined
      ) => Promise<[Record<string, unknown>, string]>

      if (!isDev()) {
        render = (await import(ssrClientPath!)).render
      } else {
        render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
          .render
      }

      const cookie = req.headers['cookie']
      console.log('cookie', cookie)
      const [initialState, appHtml] = await render(req, cookie)

      const initStateSerialized = JSON.stringify(initialState)

      const html = template
        .replace('<!--ssr-outlet-->', appHtml)
        .replace('<!--store-data-->', initStateSerialized)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (isDev() && e instanceof Error) {
        vite!.ssrFixStacktrace(e)
      }
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
