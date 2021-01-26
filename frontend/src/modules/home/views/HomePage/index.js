import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { SortableContainer } from 'react-sortable-hoc'
import arrayMove from 'array-move'

import AddBoard from '../../components/AddBoard'
import Board from '../../components/Board'

import { retrieveBoards, setBoards, switchOrder } from '../../store/actions'
import styles from './HomePage.module.scss'

const Boards = SortableContainer(({ children }) => (
  <div className={styles.root}>
    {children}
  </div>
))

function HomePage({ retrieveBoards, setBoards, switchOrder, home }) {

  useEffect(() => {
    retrieveBoards()
  }, [retrieveBoards])

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

      // Increment the orders of all board after
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
      <AddBoard />
      <Boards axis="xy" onSortEnd={handleDrag} transitionDuration={300}>
        {
          home.boards.map((board, index) => (
            <Board key={index} index={index} board={board} />
          ))
        }
      </Boards>
    </>
  )
}

const mapStateToProps = (state) => ({
  home: state.home
})

const mapDispatchToProps = (dispatch) => ({
  retrieveBoards: () => dispatch(retrieveBoards()),
  setBoards: (boards) => dispatch(setBoards(boards)),
  switchOrder: (boardIndex) => dispatch(switchOrder(boardIndex))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)