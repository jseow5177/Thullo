import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { SortableContainer } from 'react-sortable-hoc'
import arrayMove from 'array-move'

// Material UI components
import AddBoard from '../../components/AddBoard'
import Board from '../../components/Board'
import SnackAlert from '../../../../components/CustomMaterialUI/SnackAlert'

import { retrieveBoards, setBoards, switchOrder } from '../../store/actions'
import styles from './HomePage.module.scss'

const Boards = SortableContainer(({ children }) => (
  <div className={styles.root}>
    {children}
  </div>
))

function HomePage({ retrieveBoards, setBoards, switchOrder, home }) {

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
      setSnack({ open: true, message: home.error.message })
    }
  }, [home.error])

  const handleDrag = async ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) { // Do nothing when board is dropped at the same place
      const newBoards = arrayMove(home.boards, oldIndex, newIndex)

      const draggedBoard = newBoards[newIndex]

      if (newIndex === newBoards.length - 1) { // Board is moved to the end
        const secondLastBoard = newBoards[newIndex - 1]
        draggedBoard.order = secondLastBoard.order + 1
      } else { // Board is moved to anywhere in the middle
        const boardAfter = newBoards[newIndex + 1]
        draggedBoard.order = boardAfter.order
      }

      // Increment the orders of all board after dragged board
      const allBoardsAfter = newBoards.splice(newIndex + 1)
      allBoardsAfter.forEach(board => board.order += 1)

      // await not required. Else will have lag will UI response
      switchOrder({
        board: draggedBoard.id,
        order: draggedBoard.order
      })

      setBoards([...newBoards, ...allBoardsAfter])
    }
  }

  return (
    <>
      <AddBoard setSnack={setSnack} />
      <Boards axis="xy" onSortEnd={handleDrag} transitionDuration={300}>
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
  setBoards: (boards) => dispatch(setBoards(boards)),
  switchOrder: (boardIndex) => dispatch(switchOrder(boardIndex))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)