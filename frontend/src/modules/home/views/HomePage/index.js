import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { SortableContainer } from 'react-sortable-hoc'
import arrayMove from 'array-move'

import AddBoard from '../../components/AddBoard'
import Board from '../../components/Board'

import { retrieveBoards, setBoards } from '../../store/actions'
import styles from './HomePage.module.scss'

const Boards = SortableContainer(({ children }) => (
  <div className={styles.root}>
    {children}
  </div>
))

function HomePage({ retrieveBoards, setBoards, home }) {

  useEffect(() => {
    retrieveBoards()
  }, [retrieveBoards])

  const handleDrag = ({ oldIndex, newIndex }) => {
    const newBoards = arrayMove(home.boards, oldIndex, newIndex)
    setBoards(newBoards)
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
  setBoards: (boards) => dispatch(setBoards(boards))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)