import React, { ReactNode } from 'react'
import { AppLayout, FullscreenButton, Logo } from '../../../shared/ui'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Button, Flex, Typography } from 'antd'
import { ROUTES } from '../../../shared/config'
import { LogoutOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../../shared/lib'
import { logout, selectIsUserDataUpdating } from '../../../entities/user'
import { ThemeSwitcher } from '../../../shared/ui/themeToggler/ThemeToggler'

export function AuthorizedLayout({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch()
  const isUserUpdating = useAppSelector(selectIsUserDataUpdating)
  const { pathname } = useLocation()

  const currentPageName = pathname
    .split('/')[1]
    .replace(/^./, (char) => char.toUpperCase())

  return (
    <AppLayout
      header={
        <Flex justify="space-between" align="center" flex={1}>
          <Flex align="center" gap={16}>
            <Logo />
            <ThemeSwitcher />
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
            <NavLink to={ROUTES.FORUM}>
              <Button
                color="danger"
                variant={pathname === ROUTES.FORUM ? 'solid' : 'filled'}
              >
                Forum
              </Button>
            </NavLink>
          </Flex>
          <Flex align="center" gap={32}>
            <Typography.Title autoCapitalize="words">
              {currentPageName || 'Home'}
            </Typography.Title>
            <Flex gap={8} align="center">
              <FullscreenButton />
              <Button
                color="danger"
                variant="filled"
                disabled={isUserUpdating}
                iconPosition="start"
                icon={<LogoutOutlined />}
                onClick={() => dispatch(logout())}
              >
                Logout
              </Button>
            </Flex>
          </Flex>
        </Flex>
      }
    >
      {children}
    </AppLayout>
  )
}
