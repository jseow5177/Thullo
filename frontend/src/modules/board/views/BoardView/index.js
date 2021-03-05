import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import arrayMove from 'array-move'

import BoardList from '../../components/BoardList'
import ListInput from '../../components/ListInput'
import SnackAlert from '../../../../components/CustomMaterialUI/SnackAlert'

import { retrieveBoard, reorderLists, reorderCards, switchListOrder, switchCardOrder } from '../../store/actions'
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

function BoardView({
  board,
  match,
  retrieveBoard,
  reorderLists,
  switchListOrder,
  reorderCards,
  switchCardOrder
}) {

  const boardId = match.params.id

  const [snack, setSnack] = useState({
    open: false,
    message: '',
    severity: 'error'
  })

  useEffect(() => {
    retrieveBoard(boardId)
  }, [boardId, retrieveBoard])

  useEffect(() => {
    if (board.error !== null) {
      setSnack({ open: true, message: board.error.message, severity: 'error' })
    }
  }, [board.error])

  const closeSnack = () => {
    setSnack({ open: false, message: '', severity: 'error' })
  }

  const handleDragEnd = (props) => {
    const { destination, source, type, draggableId } = props

    const draggedItemId = draggableId.split('-')[1]

    // When dragged out of range
    if (!destination) {
      return
    }

    // When dropped in the same location
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    if (type === 'LIST') {
      const reorderedLists = arrayMove(board.lists, source.index, destination.index)
      // Change in frontend layout will be decoupled from backend changes to reduce latency
      reorderLists(reorderedLists) // Frontend Vuex change
      switchListOrder({ // Backend DB change
        id: draggedItemId,
        source: source.index,
        destination: destination.index
      })
    } else if (type === 'CARD') {
      const destinationListId = Number(destination.droppableId)
      const sourceListId = Number(source.droppableId)

      const destinationCards = board.cards[destinationListId] // Get cards of destination list
      const sourceCards = board.cards[sourceListId] // Get cards of source list

      const draggedCard = sourceCards.splice(source.index, 1)[0] // Remove dragged card from source
      draggedCard.board_list = destinationListId
      destinationCards.splice(destination.index, 0, draggedCard) // Add dragged card to destination

      const destinationObj = { listId: destinationListId, cards: destinationCards }
      const sourceObj = { listId: sourceListId, cards: sourceCards }

      reorderCards(destinationObj, sourceObj)
      switchCardOrder({
        id: draggedItemId,
        source: { id: sourceListId, order: source.index },
        destination: { id: destinationListId, order: destination.index }
      })
    }
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="LIST">
          {
            (provided => (
              <DroppableContainer provided={provided}>
                {
                  board.lists.map((list, index) => (
                    <BoardList
                      key={list.id}
                      id={list.id}
                      title={list.title}
                      index={index}
                    />
                  ))
                }
                {provided.placeholder}
                <ListInput />
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
  retrieveBoard: (boardId) => dispatch(retrieveBoard(boardId)),
  reorderLists: (lists) => dispatch(reorderLists(lists)),
  reorderCards: (destination, source) => dispatch(reorderCards(destination, source)),
  switchListOrder: (listInfo) => dispatch(switchListOrder(listInfo)),
  switchCardOrder: (cardInfo) => dispatch(switchCardOrder(cardInfo))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BoardView))