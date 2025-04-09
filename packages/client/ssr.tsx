import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
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

export async function render(req: ExpressRequest, cookie: string) {
  console.log('URL', req.baseUrl)
  const { query, dataRoutes } = createStaticHandler(routes)
  const fetchRequest = createFetchRequest(req)
  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }

  const router = createStaticRouter(dataRoutes, context)
  const config = new ServerConfig(cookie).getConfig()
  const store = createStore(router, config)

  const [pathname] = req.baseUrl.split('?')
  const currentRoutes = matchRoutes(routes, pathname)
  const ssrLoaders = currentRoutes.map((item) => item.route.ssrLoader)

  for (const loader of ssrLoaders) {
    if (loader) {
      await loader(store.dispatch)
    }
  }

  const initialState = store.getState()
  console.log('initialState', initialState)
  const renderResult = renderToString(
    <Provider store={store}>
      <App>
        <StaticRouterProvider router={router} context={context} />
      </App>
    </Provider>
  )

  return [initialState, renderResult]
}
