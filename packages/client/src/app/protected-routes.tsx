import { useUserInfo } from '../entities/user'
import { App, Button, Flex, Layout, Spin, Typography } from 'antd'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '../shared/config'
import { Content, Header } from 'antd/es/layout/layout'
import React, { useEffect } from 'react'
import { COLORS } from '../shared/ui/colors'
import { Logo } from '../shared/components/Logo'
import { useUserLogout } from '../entities/user/use-user-logout'
import { LogoutOutlined } from '@ant-design/icons'

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  textAlign: 'center',
  padding: '19px 50px',
  minHeight: 103,
  borderBottom: `1px solid ${COLORS.BORDER_GRAY}`,
}

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 103px)',
  paddingInline: 107,
  paddingBlock: 69,
}

const titleStyle: React.CSSProperties = {
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  color: COLORS.WHITE,
  textTransform: 'uppercase',
}

export function ProtectedRoutes() {
  const { error, isLoading } = useUserInfo()
  const { error: logoutError, logoutLoading, fn } = useUserLogout()

  const { pathname } = useLocation()
  const { notification } = App.useApp()
  const currentPageName = pathname.split('/')[1]

  useEffect(() => {
    if (!logoutError && logoutError) {
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
      <Header style={headerStyle}>
        <Flex gap={39}>
          <Logo />
          <Flex gap={20} align="center">
            <Link to={ROUTES.HOME}>
              <Button
                color="danger"
                variant={pathname === ROUTES.HOME ? 'solid' : 'filled'}
              >
                Start
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
        <Typography.Title style={titleStyle}>
          {currentPageName || 'Start'}
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
      <Content style={contentStyle}>
        <Outlet />
      </Content>
    </Layout>
  )
}
