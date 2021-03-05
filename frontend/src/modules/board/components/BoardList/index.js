import React, { useState } from 'react'
import { connect } from 'react-redux'
import NaturalDragAnimation from 'natural-drag-animation-rbdnd'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Popover from '@material-ui/core/Popover'

import MoreVertIcon from '@material-ui/icons/MoreVert'

import { reorderCards } from '../../store/actions'
import styles from './BoardList.module.scss'
import CardInput from '../CardInput'
import BoardCard from '../BoardCard'

const ListWrapper = ({ children, innerRef, draggableProps, ...props }) => (
  <div ref={innerRef} {...draggableProps} {...props}>
    {children}
  </div>
)
const ListTitle = ({ children, dragHandleProps, ...props }) => (
  <div {...dragHandleProps} {...props}>
    {children}
  </div>
)

const CardsWrapper = ({ children, provided, ...props }) => (
  <div
    ref={provided.innerRef}
    {...provided.droppableProps}
    {...props}
  >
    {children}
  </div>
)

const BoardList = ({
  board,
  id, // id of the list
  title, // title of the list
  index, // position of the list in the board
  reorderCards, // Redux action to reorder cards within or across lists
}) => {

  const [anchorEl, setAnchorEl] = useState(null)

  const openPopover = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const closePopover = () => {
    setAnchorEl(null)
  }

  return (
    <Draggable draggableId={`list-${id}`} index={index}>
      {
        (provided, snapshot) => (
          <NaturalDragAnimation
            style={provided.draggableProps.style}
            snapshot={snapshot}
            rotationMultiplier={1} // Reduce rotation degree
          >
            {
              style => (
                <ListWrapper
                  innerRef={provided.innerRef}
                  draggableProps={provided.draggableProps}
                  style={style} // Prop from NaturalDragAnimation
                  className={styles.root}
                >
                  <ListTitle dragHandleProps={provided.dragHandleProps} className={styles.listTitle}>
                    <Typography variant="h6" className={styles.text}>
                      {title}
                    </Typography>
                    <IconButton size="small" onClick={openPopover} className={styles.icon}>
                      <MoreVertIcon />
                    </IconButton>
                    <Popover
                      open={Boolean(anchorEl)}
                      anchorEl={anchorEl}
                      onClose={closePopover}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left"
                      }}
                    >
                      <List dense>
                        <ListItem button>
                          <ListItemText primary="Delete list" />
                        </ListItem>
                      </List>
                    </Popover>
                  </ListTitle>
                  <Droppable droppableId={`${id}`} type="CARD">
                    {
                      (provided) => (
                        <CardsWrapper
                          provided={provided}
                          className={styles.cardsWrapper}
                        >
                          {
                            board.cards[id] &&
                            board.cards[id].map((card, index) =>
                              <BoardCard
                                key={card.id}
                                id={card.id}
                                summary={card.summary}
                                description={card.description}
                                labels={card.label}
                                index={index}
                              />
                            )
                          }
                          {provided.placeholder}
                        </CardsWrapper>
                      )
                    }
                  </Droppable>
                  <CardInput listId={id} />
                </ListWrapper>
              )
            }
          </NaturalDragAnimation>
        )
      }
    </Draggable >
  )
}

const mapStateToProps = (state) => ({
  board: state.board
})

const mapDispatchToProps = (dispatch) => ({
  reorderCards: (destination, source) => dispatch(reorderCards(destination, source))
})

export default connect(mapStateToProps, mapDispatchToProps)(BoardList)