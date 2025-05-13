import './app.pcss'
import { ReactElement, useEffect } from 'react'
import { ConfigProvider } from 'antd'
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
    <ConfigProvider theme={theme}>
      <MessageProvider>{children}</MessageProvider>
    </ConfigProvider>
  )
}
