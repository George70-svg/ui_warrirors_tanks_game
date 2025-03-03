import { themeConfig } from './theme-config'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './app.css'
import '../shared/config/variables.pcss'
import '../shared/config/variables.pcss'

export function App() {
  return (
    <ConfigProvider theme={themeConfig}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}
