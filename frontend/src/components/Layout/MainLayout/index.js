import React from 'react'

import MainHeader from '../../Header/MainHeader'

import styles from './MainLayout.module.scss'

function MainLayout({ children }) {
  return (
    <div className={styles.layout}>
      <MainHeader />
      {children}
    </div>
  )
}

export default MainLayout