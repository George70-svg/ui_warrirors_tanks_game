import { Flex, Typography } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '../../shared/config'
import { AppLayout } from '../../shared/ui/app-layout'
import styles from './error-page.module.pcss'

const { Title, Text } = Typography

export function ErrorPage({
  title,
  message,
}: {
  title?: string
  message?: string
}) {
  const location = useLocation()
  const displayedTitle = title || location.state?.title || 'Error'
  const displayedMessage =
    message || location.state?.message || 'Something was wrong'
  return (
    <AppLayout>
      <Flex
        justify="center"
        align="center"
        vertical={true}
        className={styles.container}
      >
        <Title>{displayedTitle}</Title>
        <Text>{displayedMessage}</Text>
        <Link to={ROUTES.HOME}>Go to home page</Link>
      </Flex>
    </AppLayout>
  )
}
