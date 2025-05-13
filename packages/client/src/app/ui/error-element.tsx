import { useRouteError } from 'react-router-dom'
import { isHasMessageStringProp } from '../../shared/lib'
import { ErrorPage } from '../../pages/error-page'

export function ErrorElement() {
  const error = useRouteError()
  const message = isHasMessageStringProp(error)
    ? error.message
    : 'Unknown error'
  return <ErrorPage title="Render error" message={message} />
}
