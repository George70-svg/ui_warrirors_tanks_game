import './app.pcss'
import { ReactElement, useEffect } from 'react'
import { ConfigProvider } from 'antd'
import { themeConfig } from './theme-config'
import { MessageProvider } from './message-provider'

export function App({ children }: { children: ReactElement }) {
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log(`[PERF ENTRY]`, entry)
      }
    })

    observer.observe({ entryTypes: ['paint', 'resource', 'longtask'] })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <ConfigProvider theme={themeConfig}>
      <MessageProvider>{children}</MessageProvider>
    </ConfigProvider>
  )
}
