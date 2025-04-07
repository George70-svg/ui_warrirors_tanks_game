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
import { getUserData } from './src/entities/user/api/get-user-data'

export async function render(req: ExpressRequest) {
  const { query, dataRoutes } = createStaticHandler(routes)
  const fetchRequest = createFetchRequest(req)
  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }

  const router = createStaticRouter(dataRoutes, context)
  const store = createStore(router)

  /*  store.dispatch({
    type: getUserData.fulfilled.type,
    payload: {
      id: 3180,
      first_name: 'Test',
      second_name: 'Test',
      display_name: 'Test',
      login: 'Test',
      avatar: '/ba5039ec-dfea-4607-bcbd-1a54ded9acc6/dbca6f76-7ea2-498e-807f-a06017e210b4_128.png',
      email: 'Test@mail.org',
      phone: '89221456783'
    },
  })*/

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
