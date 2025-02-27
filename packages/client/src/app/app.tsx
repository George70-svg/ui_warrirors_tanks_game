import { themeConfig } from './theme-config'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

export function App() {
  return (
    <ConfigProvider theme={themeConfig}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}
