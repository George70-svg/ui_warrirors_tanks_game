import { ReactNode } from 'react'
import { Image, Flex } from 'antd'
import wideLogoPng from '../../../assets/wide_logo.png'
import gameplayVideoWebm from '../../../assets/gameplay_video.webm'
import { AppLayout } from './app-layout'
import styles from './auth-layout.module.pcss'

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <AppLayout>
      <div className={styles.videoBackground}>
        <video autoPlay muted loop playsInline>
          <source src={gameplayVideoWebm} type="video/webm" />
        </video>
      </div>

      <Flex
        vertical={true}
        align="center"
        justify="center"
        className={styles.container}
        gap="small"
      >
        <Image
          src={wideLogoPng}
          alt="Battle City Logo"
          className="auth-logo"
          preview={false}
          rootClassName={styles.image}
        />

        {children}
      </Flex>
    </AppLayout>
  )
}
