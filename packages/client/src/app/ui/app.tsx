import './app.pcss'
import { ReactElement } from 'react'
import { App as AntApp, ConfigProvider } from 'antd'
import { themeConfig } from './theme-config'
import { MessageProvider } from './message-provider'

export function App({ children }: { children: ReactElement }) {
  return (
    <AntApp>
      <ConfigProvider theme={themeConfig}>
        <MessageProvider>{children}</MessageProvider>
      </ConfigProvider>
    </AntApp>
  )
}
