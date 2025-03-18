import { store } from './store'
import { RouterProvider } from 'react-router-dom'
import { router } from './routing/router'
import './app.pcss'
import { Provider } from 'react-redux'
import { App as AntApp, ConfigProvider } from 'antd'
import { themeConfig } from './theme-config'
import React from 'react'

export function App() {
  return (
    <AntApp>
      <ConfigProvider theme={themeConfig}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ConfigProvider>
    </AntApp>
  )
}
