import { renderToString } from 'react-dom/server'
import { App } from './src/app/ui/app'

export async function render() {
  return renderToString(
    <App>
      <span>TestSSR</span>
    </App>
  )
}
