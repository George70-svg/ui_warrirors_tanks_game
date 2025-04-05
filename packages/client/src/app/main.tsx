import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './ui/app'
import { App as AntApp, ConfigProvider } from 'antd'
import { themeConfig } from './theme-config'
import { Provider } from 'react-redux'
import { store } from './store'
import { startServiceWorker } from '../../serviceWorker'

startServiceWorker()

const Main = () => {
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
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Main />
)
