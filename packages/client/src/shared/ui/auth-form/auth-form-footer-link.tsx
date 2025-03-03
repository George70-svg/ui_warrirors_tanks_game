import { Link } from 'react-router-dom'

interface AuthFormFooterLinkProps {
  text: string
  link: string
}

export const AuthFormFooterLink: React.FC<AuthFormFooterLinkProps> = ({
  link,
  text,
}) => {
  return (
    <Link to={link} className="auth-form-footer-link">
      {text}
    </Link>
  )
}
