import { Link as RouterLink, useRouteError } from 'react-router-dom'
import { Layout, Typography } from 'antd'
import { ROUTES } from '../../shared/config'
import { isHasMessageStringProp } from '../../shared/lib'
import styles from './error-element.module.pcss'

const { Content } = Layout
const { Title, Link, Text } = Typography

export function ErrorElement() {
  const error = useRouteError()
  return (
    <Layout className={styles.layout}>
      <Content className={styles.container}>
        <Title>Render Error</Title>
        <Text>
          {isHasMessageStringProp(error) ? error.message : 'Unknown error'}
        </Text>
        <RouterLink to={ROUTES.HOME}>
          <Link>Go to home page</Link>
        </RouterLink>
      </Content>
    </Layout>
  )
}
