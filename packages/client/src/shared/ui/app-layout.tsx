import { ReactNode } from 'react'
import { Divider, Layout } from 'antd'
import styles from './app-layout.module.pcss'

const { Content, Header } = Layout

export function AppLayout({
  children,
  header,
}: {
  children: ReactNode
  header?: ReactNode
}) {
  return (
    <Layout className={styles.layout}>
      {header && <Header className={styles.header}>{header}</Header>}
      <Content className={styles.content}>{children}</Content>
    </Layout>
  )
}
