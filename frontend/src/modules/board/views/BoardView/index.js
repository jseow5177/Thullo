import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import arrayMove from 'array-move'

import BoardList from '../../components/BoardList'
import ListInput from '../../components/ListInput'
import SnackAlert from '../../../../components/CustomMaterialUI/SnackAlert'

// import MoreVertIcon from '@material-ui/icons/MoreVert'

import { getLists, setLists } from '../../store/actions'
import styles from './BoardView.module.scss'

const DroppableContainer = ({ children, provided }) => (
  <div
    {...provided.droppableProps}
    ref={provided.innerRef}
    className={styles.droppable}
  >
    {children}
  </div>
)

function BoardView({ board, getLists, setLists, match }) {

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

  const handleDragEnd = ({ destination, source }) => {
    const reorderedLists = arrayMove(board.lists, source.index, destination.index)
    setLists(reorderedLists)
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" direction="horizontal">
          {
            (provided => (
              <DroppableContainer provided={provided}>
                {
                  board.lists.map((list, index) => (
                    <BoardList
                      key={list.id}
                      title={list.title}
                      index={index}
                    />
                  ))
                }
                {provided.placeholder}
                <ListInput setSnack={setSnack} />
              </DroppableContainer>
            ))
          }
        </Droppable>
      </DragDropContext>
      <SnackAlert
        open={snack.open}
        message={snack.message}
        closable
        handleClose={closeSnack}
        severity={snack.severity}
      />
    </>
  )
}

const mapStateToProps = (state) => ({
  board: state.board
})

const mapDispatchToProps = (dispatch) => ({
  getLists: (boardId) => dispatch(getLists(boardId)),
  setLists: (lists) => dispatch(setLists(lists))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BoardView))