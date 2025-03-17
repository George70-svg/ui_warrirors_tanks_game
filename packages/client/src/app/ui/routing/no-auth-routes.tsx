import { useUserInfo } from '../../../entities/user'
import { Spin } from 'antd'
import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../../../shared/config'
import { AuthLayout } from '../layout/auth-layout'

export function NoAuthRoutes() {
  const { data, isLoading } = useUserInfo()

  if (isLoading) {
    return <Spin />
  }

  if (data) {
    return <Navigate to={ROUTES.HOME} replace={true} />
  }

  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  )
}
