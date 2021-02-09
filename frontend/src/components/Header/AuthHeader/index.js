import React from 'react'
import styles from './AuthHeader.module.scss'

import Logo from '../../Logo.js'

function AuthHeader() {
  return (
    <div className={styles.authHeader}>
      <Logo size="7rem" variant="text-and-logo" />
    </div>
  )
}

export default AuthHeader