import { ReactNode } from 'react'
import { Image, Flex } from 'antd'
import wideLogoPng from '../../../assets/wide_logo.png'
import gameplayVideoWebm from '../../../../public/images/gameplay_video.webm'
import { AppLayout } from '../../../shared/ui'
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

      <Flex vertical={true} align="center" className={styles.container}>
        <Image
          src={wideLogoPng}
          alt="Battle City Logo"
          className="auth-logo"
          preview={false}
          rootClassName={styles.image}
        />
        <Flex vertical={true} justify="center" flex="1">
          {children}
        </Flex>
      </Flex>
    </AppLayout>
  )
}
