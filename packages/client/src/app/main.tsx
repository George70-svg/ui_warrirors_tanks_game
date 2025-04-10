import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { App } from './ui/app'
import { createStore } from './store'
import { routes } from './ui/routing/routes'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createCache, StyleProvider } from '@ant-design/cssinjs'
import { ClientConfig } from '../shared/api/api-config'
// import { startServiceWorker } from '../../serviceWorker'

/*if (process.env.NODE_ENV === 'production') {
  startServiceWorker()
}*/

const initialState = window.initialState

const router = createBrowserRouter(routes)
const config = new ClientConfig().getConfig()
const cache = createCache()

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={createStore(router, config, initialState)}>
      <StyleProvider cache={cache}>
        <App>
          <RouterProvider router={router} />
        </App>
      </StyleProvider>
    </Provider>
  </React.StrictMode>
)
