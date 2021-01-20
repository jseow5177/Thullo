import React from 'react'
import { connect } from 'react-redux'

import LinearProgress from '@material-ui/core/LinearProgress'

import MainHeader from '../../Header/MainHeader'

import styles from './MainLayout.module.scss'

function MainLayout({ children, home }) {
  return (
    <div className={styles.layout}>
      <MainHeader />
      {home.getBoardsLoading && <LinearProgress color="primary" />}
      {children}
    </div>
  )
}

const mapStateToProps = (state) => ({
  home: state.home
})

export default connect(mapStateToProps, null)(MainLayout)