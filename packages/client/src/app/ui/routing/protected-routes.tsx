import { useUserAuth } from '../../../entities/user'
import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../../../shared/config'
import { AuthorizedLayout } from '../layout/authorized-layout'

export function ProtectedRoutes() {
  const { isUserAuthorized } = useUserAuth()

  if (!isUserAuthorized) {
    return <Navigate to={ROUTES.SIGN_IN} replace={true} />
  }

  return (
    <AuthorizedLayout>
      <Outlet />
    </AuthorizedLayout>
  )
}
