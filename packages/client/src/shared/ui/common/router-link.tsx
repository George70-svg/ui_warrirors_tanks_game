import { Typography } from 'antd'
import { Link } from 'react-router-dom'
import { ReactNode } from 'react'

const { Link: AntLink } = Typography

export function RouterLink({
  to,
  children,
}: {
  to: string
  children: ReactNode
}) {
  return (
    <AntLink>
      <span>
        <Link to={to}>{children}</Link>
      </span>
    </AntLink>
  )
}
