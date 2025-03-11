import { useUserInfo } from '../entities/user'
import { Flex, Layout, Spin } from 'antd'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '../shared/config'
import { Content } from 'antd/es/layout/layout'
import React from 'react'
import '../shared/components/Header/header.pcss'
import { Header } from '../shared/components/Header/Header'

export function ProtectedRoutes() {
  const { error, isLoading } = useUserInfo()

  if (isLoading) {
    return (
      <Flex justify="center" align="center" style={{ height: '100vh' }}>
        <Spin />
      </Flex>
    )
  }

  if (error) {
    return <Navigate to={ROUTES.SIGN_IN} replace={true} />
  }

  return (
    <Layout>
      <Header />
      <Content className="content">
        <Outlet />
      </Content>
    </Layout>
  )
}
