import { AppLayout } from '../../../shared/ui'
import { Flex, Spin } from 'antd'
import styles from './load-user-route.module.pcss'
import { useUserAuth } from '../../../entities/user'
import { Outlet } from 'react-router-dom'

export function LoadUserRoute() {
  const { isUserAuthStatusSuccess } = useUserAuth()

  if (isUserAuthStatusSuccess) {
    return <Outlet />
  }

  return (
    <AppLayout>
      <Flex align="center" justify="center" className={styles.container}>
        <Spin />
      </Flex>
    </AppLayout>
  )
}
