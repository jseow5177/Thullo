import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import NaturalDragAnimation from 'natural-drag-animation-rbdnd'
import { Draggable } from 'react-beautiful-dnd'

import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Popover from '@material-ui/core/Popover'
import LinearProgress from '@material-ui/core/LinearProgress'

import MoreVertIcon from '@material-ui/icons/MoreVert'

import { retrieveCards } from '../../store/actions'
import styles from './BoardList.module.scss'
import CardInput from '../CardInput'

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

const BoardList = ({
  board,
  id, // id of the list
  title, // title of the list
  index, // position of the list in the board
  retrieveCards // retrive cards of the list
}) => {

  const [anchorEl, setAnchorEl] = useState(null)
  const [isRetrievingCards, setIsRetrievingCards] = useState(false)

  useEffect(() => {
    async function fetchCards() {
      setIsRetrievingCards(true) // Loading
      await retrieveCards(id)
      setIsRetrievingCards(false) // Not loading
    }
    fetchCards()
  }, [id, retrieveCards])

  const openPopover = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const closePopover = () => {
    setAnchorEl(null)
  }

  return (
    <Draggable draggableId={title} index={index}>
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
                  {
                    isRetrievingCards && <LinearProgress />
                  }
                  {/* TODO: Place cards here */}
                  <CardInput listId={id} />
                </ListWrapper>
              )
            }
          </NaturalDragAnimation>
        )
      }
    </Draggable>
  )
}

const mapStateToProps = (state) => ({
  board: state.board
})

const mapDispatchToProps = (dispatch) => ({
  retrieveCards: (listId) => dispatch(retrieveCards(listId))
})

export default connect(mapStateToProps, mapDispatchToProps)(BoardList)