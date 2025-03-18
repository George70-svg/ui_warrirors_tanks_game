import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './ui/app'
import { App as AntApp, ConfigProvider } from 'antd'
import { themeConfig } from './theme-config'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AntApp>
      <ConfigProvider theme={themeConfig}>
        <App />
      </ConfigProvider>
    </AntApp>
  </React.StrictMode>
)
