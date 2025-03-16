import { useUserInfo } from '../../../entities/user'
import { Spin } from 'antd'
import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../../../shared/config'
import { AuthorizedLayout } from '../layout/authorized-layout'

export function ProtectedRoutes() {
  const { error, isLoading } = useUserInfo()

  if (isLoading) {
    return <Spin />
  }

  if (error) {
    return <Navigate to={ROUTES.SIGN_IN} replace={true} />
  }

  return (
    <AuthorizedLayout>
      <Outlet />
    </AuthorizedLayout>
  )
}
