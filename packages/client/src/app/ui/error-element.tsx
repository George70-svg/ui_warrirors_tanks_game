import { Link as RouterLink, useRouteError } from 'react-router-dom'
import { Layout, Typography } from 'antd'
import { ROUTES } from '../../shared/config'
import { isHasMessageStringProp } from '../../shared/lib'
import styles from './error-element.module.pcss'

const { Header, Content } = Layout
const { Title, Link, Paragraph } = Typography

export function ErrorElement() {
  const error = useRouteError()
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Title className={styles.title}>Render Error</Title>
      </Header>
      <Content className={styles.container}>
        <Paragraph>
          {isHasMessageStringProp(error) ? error.message : 'Unknown error'}
        </Paragraph>
        <RouterLink to={ROUTES.HOME}>
          <Link>Go to home page</Link>
        </RouterLink>
      </Content>
    </Layout>
  )
}
