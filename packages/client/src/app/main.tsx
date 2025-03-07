import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app'
import { App as AntApp } from 'antd'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AntApp>
      <App />
    </AntApp>
  </React.StrictMode>
)
