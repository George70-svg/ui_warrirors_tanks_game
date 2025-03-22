import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './ui/app'
import { App as AntApp, ConfigProvider } from 'antd'
import { themeConfig } from './theme-config'
import { Provider } from 'react-redux'
import { store } from './store'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/src/shared/service-worker/service-worker.js')
      .then(
        (registration) => {
          console.log(
            'ServiceWorker registration successful with scope: ',
            registration.scope
          )
        },
        (error) => {
          console.log('ServiceWorker registration failed: ', error)
        }
      )
  })
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AntApp>
      <ConfigProvider theme={themeConfig}>
        <Provider store={store}>
          <App />
        </Provider>
      </ConfigProvider>
    </AntApp>
  </React.StrictMode>
)
