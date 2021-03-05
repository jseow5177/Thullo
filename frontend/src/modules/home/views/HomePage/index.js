import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { SortableContainer } from 'react-sortable-hoc'
import arrayMove from 'array-move'

// Material UI components
import AddBoard from '../../components/AddBoard'
import Board from '../../components/Board'
import SnackAlert from '../../../../components/CustomMaterialUI/SnackAlert'

import { retrieveBoards, reorderBoards, switchOrder } from '../../store/actions'
import styles from './HomePage.module.scss'

const Boards = SortableContainer(({ children }) => (
  <div className={styles.boards}>
    {children}
  </div>
))

function HomePage({ retrieveBoards, reorderBoards, switchOrder, home }) {

  const [snack, setSnack] = useState({
    open: false,
    message: '',
    severity: 'error'
  })

  const closeSnack = () => {
    setSnack({ open: false, message: '', severity: 'error' })
  }

  useEffect(() => {
    retrieveBoards()
  }, [retrieveBoards])

  useEffect(() => {
    if (home.error !== null) {
      setSnack({ open: true, message: home.error.message, severity: 'error' })
    }
  }, [home.error])

  const handleDrag = ({ oldIndex: source, newIndex: destination }) => {
    if (destination !== source) { // Do nothing when board is dropped at the same place
      const newBoards = arrayMove(home.boards, source, destination)

      const draggedBoard = newBoards[destination]

      reorderBoards(newBoards)
      switchOrder({
        id: draggedBoard.id,
        source,
        destination
      })
    }
  }

  return (
    <>
      <AddBoard setSnack={setSnack} />
      <Boards axis="xy" onSortEnd={handleDrag} transitionDuration={300} distance={1}>
        {
          home.boards.map((board, index) => (
            <Board key={index} index={index} board={board} />
          ))
        }
      </Boards>
      <SnackAlert
        open={snack.open}
        message={snack.message}
        severity={snack.severity}
        closable={true}
        handleClose={closeSnack}
      />
    </>
  )
}

const mapStateToProps = (state) => ({
  home: state.home,
})

const mapDispatchToProps = (dispatch) => ({
  retrieveBoards: () => dispatch(retrieveBoards()),
  reorderBoards: (boards) => dispatch(reorderBoards(boards)),
  switchOrder: (boardIndex) => dispatch(switchOrder(boardIndex))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)