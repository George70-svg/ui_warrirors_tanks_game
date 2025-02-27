import { useRouteError } from 'react-router-dom'

export function ClientErrorPage() {
  const error = useRouteError()
  return <div>ClientErrorPage: {JSON.stringify(error)}</div>
}
