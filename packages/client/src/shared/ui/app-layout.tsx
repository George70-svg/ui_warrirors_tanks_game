import { ReactNode } from 'react'
import { Layout } from 'antd'
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
      {header && <Header>{header}</Header>}
      <Content>{children}</Content>
    </Layout>
  )
}
