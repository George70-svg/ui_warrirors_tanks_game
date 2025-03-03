import { ReactNode } from 'react'
import { Image } from 'antd'
import './auth-layout.pcss'
import wideLogoPng from '../../assets/wide_logo.png'
import gameplayVideoWebm from '../../assets/gameplay_video.webm'

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps): React.ReactElement {
  return (
    <div className="auth-layout">
      <video autoPlay muted loop className="auth-background-video">
        <source src={gameplayVideoWebm} type="video/webm" />
      </video>

      <div className="auth-content">
        <div className="auth-logo-container">
          <Image
            src={wideLogoPng}
            alt="Battle City Logo"
            className="auth-logo"
            preview={false}
          />
        </div>

        {children}
      </div>
    </div>
  )
}
