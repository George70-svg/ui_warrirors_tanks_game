import { themeConfig } from './theme-config'
import { ConfigProvider } from 'antd'

export function App() {
  return (
    <ConfigProvider theme={themeConfig}>
      <div className="App">Вот тут будет жить ваше приложение :)</div>
    </ConfigProvider>
  )
}
