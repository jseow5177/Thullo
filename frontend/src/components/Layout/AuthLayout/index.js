import React from 'react'
import styles from './AuthLayout.module.scss'

import AuthHeader from '../../Header/AuthHeader'

function AuthLayout({ children }) {
  return (
    <div className={styles.layout}>
      <AuthHeader />
      {children}
    </div>
  )
}

export default AuthLayout