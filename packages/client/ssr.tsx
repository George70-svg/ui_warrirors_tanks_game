import { renderToString } from 'react-dom/server'

const TestSSR = () => {
  return <div>TestSSR</div>
}

export async function render() {
  return renderToString(<TestSSR />)
}
