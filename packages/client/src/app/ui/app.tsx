import './app.pcss'
import { ReactElement, useEffect } from 'react'
import { App as AntApp, ConfigProvider } from 'antd'
import { MessageProvider } from './message-provider'
import { useThemeTracker } from '../../shared/ui/themeToggler/useTheme'

export function App({ children }: { children: ReactElement }) {
  const theme = useThemeTracker()

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
    <AntApp>
      <ConfigProvider theme={theme}>
        <MessageProvider>{children}</MessageProvider>
      </ConfigProvider>
    </AntApp>
  )
}
