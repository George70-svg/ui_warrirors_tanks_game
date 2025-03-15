import { themeConfig } from './theme-config'
import { ConfigProvider, App as AntApp } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './app.pcss'
import '../shared/config/variables.pcss'

export function App() {
  return (
    <AntApp>
      <ConfigProvider theme={themeConfig}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </AntApp>
  )
}
