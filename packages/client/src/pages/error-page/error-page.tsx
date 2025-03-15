import { Layout, Typography } from 'antd'
import styles from './error-page.module.pcss'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { ROUTES } from '../../shared/config'

const { Content } = Layout
const { Title, Link, Text } = Typography

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
    <Layout className={styles.layout}>
      <Content className={styles.container}>
        <Title>{displayedTitle}</Title>
        <Text>{displayedMessage}</Text>
        <RouterLink to={ROUTES.HOME}>
          <Link>Go to home page</Link>
        </RouterLink>
      </Content>
    </Layout>
  )
}
