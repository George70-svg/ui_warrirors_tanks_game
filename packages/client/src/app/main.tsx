import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './ui/app'
import { App as AntApp, ConfigProvider } from 'antd'
import { themeConfig } from './theme-config'
import { Provider } from 'react-redux'
import { store } from './store'

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
