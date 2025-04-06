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
import { createFetchRequest } from './src/ssr.utils'

export async function render(req: ExpressRequest) {
  const { query, dataRoutes } = createStaticHandler(routes)
  const fetchRequest = createFetchRequest(req)
  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }

  const router = createStaticRouter(dataRoutes, context)
  const store = createStore(router)

  const initialState = store.getState()
  const renderResult = renderToString(
    <Provider store={store}>
      <App>
        <StaticRouterProvider router={router} context={context} />
      </App>
    </Provider>
  )

  return [initialState, renderResult]
}
