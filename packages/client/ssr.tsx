import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'
import { Request as ExpressRequest } from 'express'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { App } from './src/app/ui/app'
import { createStore } from './src/app/store'
import { routes } from './src/app/ui/routing/routes'
import { createFetchRequest } from './ssr.utils'
import { ServerConfig } from './src/shared/api/api-config'
import { matchRoutes } from 'react-router-dom'
import { createApiCall } from './src/shared/api'

export async function render(req: ExpressRequest, cookie: string) {
  const { query, dataRoutes } = createStaticHandler(routes)
  const fetchRequest = createFetchRequest(req)
  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }

  const router = createStaticRouter(dataRoutes, context)
  const apiCall = createApiCall(new ServerConfig(cookie).getConfig())
  const store = createStore(router, apiCall)

  const [pathname] = req.baseUrl.split('?')
  const currentRoutes = matchRoutes(routes, pathname)

  const ssrLoaders = currentRoutes
    .filter((item) => item.route.ssrLoader)
    .map((item) => {
      return item.route.ssrLoader
    })

  for (const loader of ssrLoaders) {
    await loader(store.dispatch)
  }

  const cache = createCache()

  const renderResult = renderToString(
    <Provider store={store}>
      <StyleProvider cache={cache}>
        <App>
          <StaticRouterProvider router={router} context={context} />
        </App>
      </StyleProvider>
    </Provider>
  )

  const styleText = extractStyle(cache)
  const initialState = store.getState()

  return [initialState, renderResult, styleText]
}
