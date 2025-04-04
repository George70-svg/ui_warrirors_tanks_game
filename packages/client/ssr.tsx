import { renderToString } from 'react-dom/server'

const TestSSR = () => {
  return <div>TestSSR</div>
}

export function render() {
  return renderToString(<TestSSR />)
}
