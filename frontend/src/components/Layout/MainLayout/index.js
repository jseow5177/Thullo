import React from 'react'
import { connect } from 'react-redux'

import LinearProgress from '@material-ui/core/LinearProgress'

import MainHeader from '../../Header/MainHeader'

import styles from './MainLayout.module.scss'

function MainLayout({ children, home, board }) {
  return (
    <>
      <MainHeader />
      {
        (home.getBoardsLoading || board.getListsLoading) &&
        <LinearProgress color="primary" />
      }
      <div className={styles.layout}>
        {children}
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  home: state.home,
  board: state.board
})

export default connect(mapStateToProps, null)(MainLayout)