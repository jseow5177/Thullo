import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ListInput from '../../components/ListInput'
import SnackAlert from '../../../../components/CustomMaterialUI/SnackAlert'

import { getLists } from '../../store/actions'
import styles from './BoardView.module.scss'

function BoardView({ board, getLists, match }) {

  const [snack, setSnack] = useState({
    open: false,
    message: '',
    severity: 'error'
  })

  useEffect(() => {
    getLists(match.params.id)
  }, [match.params.id, getLists])

  useEffect(() => {
    if (board.error !== null) {
      setSnack({ open: true, message: board.error.message, severity: 'error' })
    }
  }, [board.error])

  const closeSnack = () => {
    setSnack({ open: false, message: '', severity: 'error' })
  }

  return (
    <div className={styles.root}>
      <ListInput setSnack={setSnack} />
      <SnackAlert
        open={snack.open}
        message={snack.message}
        closable
        handleClose={closeSnack}
        severity={snack.severity}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  board: state.board
})

const mapDispatchToProps = (dispatch) => ({
  getLists: (boardId) => dispatch(getLists(boardId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BoardView))