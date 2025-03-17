import { ReactNode } from 'react'
import { theme, Layout } from 'antd'
import styles from './app-layout.module.pcss'

const { Content, Header } = Layout
const { useToken } = theme

export function AppLayout({
  children,
  header,
}: {
  children: ReactNode
  header?: ReactNode
}) {
  const { token } = useToken()
  return (
    <Layout className={styles.layout}>
      {header && (
        <Header
          className={styles.header}
          style={{ borderBottom: `1px solid ${token.colorSplit}` }}
        >
          {header}
        </Header>
      )}
      <Content className={styles.content}>{children}</Content>
    </Layout>
  )
}
