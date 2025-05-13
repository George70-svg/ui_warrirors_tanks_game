import dotenv from 'dotenv'
import express from 'express'
import * as fs from 'node:fs'
import * as path from 'node:path'
import * as console from 'node:console'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'
import * as process from 'node:process'
import { createProxyMiddleware } from 'http-proxy-middleware'
import cookieParser from 'cookie-parser'
import { dbConnect } from './db'
import app from './src/app/app'

dotenv.config()

const { NODE_ENV, SERVER_PORT } = process.env

const isDev = () => NODE_ENV === 'development'

async function startServer() {
  await dbConnect()
  const port = Number(SERVER_PORT)

  let vite: ViteDevServer | undefined
  let distPath: string | undefined
  let ssrClientPath: string | undefined
  let srcPath: string | undefined

  if (isDev()) {
    srcPath = path.dirname(require.resolve('client'))
  } else {
    distPath = path.resolve(__dirname, 'client', 'dist')
    ssrClientPath = path.resolve(__dirname, 'client', 'dist-ssr', 'client.cjs')
  }

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

  app.use('*', cookieParser(), async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string
      if (isDev()) {
        template = fs.readFileSync(
          path.resolve(srcPath!, 'index.html'),
          'utf-8'
        )
        template = await vite!.transformIndexHtml(url, template)
      } else {
        template = fs.readFileSync(
          path.resolve(distPath!, 'index.html'),
          'utf-8'
        )
      }

      let render: (
        req: unknown,
        apiConfig: string | undefined
      ) => Promise<[Record<string, unknown>, string, string]>

      if (isDev()) {
        render = (await vite!.ssrLoadModule(path.resolve(srcPath!, 'ssr.tsx')))
          .render
      } else {
        render = (await import(ssrClientPath!)).render
      }

      const cookie = req.headers['cookie']

      const [initialState, appHtml, styleText] = await render(req, cookie)

      const initStateSerialized = JSON.stringify(initialState)

      const html = template
        .replace(
          '<!--antd-style-data-->',
          `<style id="antd-style">${styleText}</style>`
        )
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
