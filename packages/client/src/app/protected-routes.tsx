import { useUserInfo } from '../entities/user'
import { App, Button, Flex, Layout, Spin, Typography } from 'antd'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '../shared/config'
import { Content, Header } from 'antd/es/layout/layout'
import React, { useEffect } from 'react'
import { Logo } from '../shared/components/Logo'
import { useUserLogout } from '../entities/user/use-user-logout'
import { LogoutOutlined } from '@ant-design/icons'
import './protected-routes.pcss'

export function ProtectedRoutes() {
  const { error, isLoading } = useUserInfo()
  const { error: logoutError, logoutLoading, fn } = useUserLogout()

  const { pathname } = useLocation()
  const { notification } = App.useApp()
  const currentPageName = pathname.split('/')[1]

  useEffect(() => {
    if (!logoutLoading && logoutError) {
      notification.error({ message: JSON.stringify(logoutError) })
    }
  }, [notification, logoutError, logoutLoading])

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
      <Header className="header">
        <Flex gap={39}>
          <Logo />
          <Flex gap={20} align="center">
            <Link to={ROUTES.HOME}>
              <Button
                color="danger"
                variant={pathname === ROUTES.HOME ? 'solid' : 'filled'}
              >
                Home
              </Button>
            </Link>
            <Link to={ROUTES.LEADERBOARD}>
              <Button
                color="danger"
                variant={pathname === ROUTES.LEADERBOARD ? 'solid' : 'filled'}
              >
                Leaderboard
              </Button>
            </Link>
            <Link to={ROUTES.PROFILE}>
              <Button
                color="danger"
                variant={pathname === ROUTES.PROFILE ? 'solid' : 'filled'}
              >
                Profile
              </Button>
            </Link>
          </Flex>
        </Flex>
        <Typography.Title className="title">
          {currentPageName || 'Home'}
        </Typography.Title>
        <Button
          color="danger"
          variant="filled"
          loading={logoutLoading}
          iconPosition="start"
          icon={<LogoutOutlined />}
          onClick={fn}
        >
          Logout
        </Button>
      </Header>
      <Content className="content">
        <Outlet />
      </Content>
    </Layout>
  )
}
