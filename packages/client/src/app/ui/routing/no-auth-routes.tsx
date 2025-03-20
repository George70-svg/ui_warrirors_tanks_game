import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../../../shared/config'
import { AuthLayout } from '../layout/auth-layout'
import { useUserAuth } from '../../../entities/user'

export function NoAuthRoutes() {
  const { isUserAuthorized } = useUserAuth()

  if (isUserAuthorized) {
    return <Navigate to={ROUTES.HOME} replace={true} />
  }

  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  )
}
