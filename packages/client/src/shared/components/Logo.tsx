import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../config'
import LogoIcon from '../../assets/Logo.svg?react'

export const Logo = () => {
  return (
    <Link to={ROUTES.HOME} style={{ maxHeight: '70px' }}>
      <LogoIcon style={{ width: '196px', height: '70px' }} />
    </Link>
  )
}
