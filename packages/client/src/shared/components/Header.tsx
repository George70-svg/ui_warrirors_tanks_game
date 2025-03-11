import React, { FC, useEffect } from 'react'
import { App, Button, Flex, Typography } from 'antd'
import { Header as AntHeader } from 'antd/es/layout/layout'
import { Logo } from './Logo'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '../config'
import { LogoutOutlined } from '@ant-design/icons'
import { useUserLogout } from '../../entities/user/use-user-logout'

export const Header: FC = () => {
  const { pathname } = useLocation()
  const currentPageName = pathname.split('/')[1]
  const { error: logoutError, logoutLoading, fn } = useUserLogout()

  const { notification } = App.useApp()

  useEffect(() => {
    if (!logoutLoading && logoutError) {
      notification.error({ message: JSON.stringify(logoutError) })
    }
  }, [notification, logoutError, logoutLoading])

  return (
    <AntHeader className="header">
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
      <Typography.Title className="title">
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
    </AntHeader>
  )
}
