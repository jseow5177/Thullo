import React from 'react'
import { connect } from 'react-redux'

import LinearProgress from '@material-ui/core/LinearProgress'

import MainHeader from '../../Header/MainHeader'

import styles from './MainLayout.module.scss'

function MainLayout({ children, home, board }) {
  return (
    <div className={styles.layout}>
      <MainHeader />
      {
        (home.getBoardsLoading || board.getListsLoading) &&
        <LinearProgress color="primary" />
      }
      <div className={styles.childrenWrapper}>
        {children}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  home: state.home,
  board: state.board
})

export default connect(mapStateToProps, null)(MainLayout)