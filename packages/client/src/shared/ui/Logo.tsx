import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../config'
import LogoIcon from '../../assets/Logo.svg?react'
import styles from './logo.module.pcss'

export const Logo = () => {
  return (
    <Link to={ROUTES.HOME} className={styles.link}>
      <LogoIcon className={styles.logo} />
    </Link>
  )
}
