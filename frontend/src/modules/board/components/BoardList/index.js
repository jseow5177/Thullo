import React, { useState } from 'react'
import { connect } from 'react-redux'
import NaturalDragAnimation from 'natural-drag-animation-rbdnd'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Popover from '@material-ui/core/Popover'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import MoreVertIcon from '@material-ui/icons/MoreVert'

import { updateList, deleteList } from '../../store/actions'
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
  updateList,
  deleteList
}) => {

  const [anchorEl, setAnchorEl] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [isEditMode, setIsEditMode] = useState(false)
  const [isDeletingList, setIsDeletingList] = useState(false)

  const [confirmationText, setConfirmationText] = useState('')
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false)

  const openPopover = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const closePopover = () => {
    setAnchorEl(null)
  }

  const setTitleEditMode = () => {
    setIsEditMode(true)
    setNewTitle(title)
  }

  const handleNewTitleChange = (e) => {
    setNewTitle(e.target.value)
  }

  const highlightText = (e) => {
    e.target.select()
  }

  const openConfirmationDialog = () => {
    setIsConfirmationDialogOpen(true)
  }

  const closeConfirmationDialog = () => {
    setIsConfirmationDialogOpen(false)
  }

  const handleConfirmationTextChange = (e) => {
    setConfirmationText(e.target.value)
  }

  const submitListUpdate = async () => {
    setIsEditMode(false)

    if (newTitle !== '' && newTitle !== title) {
      updateList({
        id, title: newTitle
      })
    }
  }

  const checkIfListIsEmptyBeforeDelete = () => {
    closePopover()
    if (board.cards[id].length > 0) {
      openConfirmationDialog()
    } else {
      submitListDelete()
    }
  }

  const submitListDelete = async () => {
    closeConfirmationDialog()
    setIsDeletingList(true)
    await deleteList(id)
  }

  return (
    <>
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
                    <ListTitle
                      dragHandleProps={provided.dragHandleProps}
                      className={styles.listTitle}
                    >
                      {
                        isEditMode
                          ?
                          <TextField
                            value={newTitle}
                            className={styles.textInput}
                            onChange={handleNewTitleChange}
                            onFocus={highlightText}
                            variant="outlined"
                            autoFocus
                            onBlur={submitListUpdate}
                          />
                          :
                          <Typography
                            variant="h6"
                            className={styles.text}
                            onClick={setTitleEditMode}
                          >
                            {title}
                          </Typography>
                      }
                      {
                        isDeletingList
                          ?
                          <CircularProgress size={30} />
                          :
                          <IconButton size="small" onClick={openPopover} className={styles.icon}>
                            <MoreVertIcon />
                          </IconButton>
                      }
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
                          <ListItem button onClick={checkIfListIsEmptyBeforeDelete}>
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
      {
        isConfirmationDialogOpen &&
        <Dialog open={true} onClose={closeConfirmationDialog}>
          <DialogTitle>Delete list <b>{title}</b>?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You have <b>{board.cards[id].length} card(s)</b> in this list.
              Deleting this list will delete them as well.
              Are you sure?
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Type YES to confirm"
              type="text"
              value={confirmationText}
              onChange={handleConfirmationTextChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              disabled={confirmationText !== "YES"}
              onClick={submitListDelete}
            >
              Delete
          </Button>
            <Button variant="outlined" color="default" onClick={closeConfirmationDialog}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      }
    </>
  )
}

const mapStateToProps = (state) => ({
  board: state.board
})

const mapDispatchToProps = (dispatch) => ({
  updateList: (listInfo) => dispatch(updateList(listInfo)),
  deleteList: (listId) => dispatch(deleteList(listId))
})

export default connect(mapStateToProps, mapDispatchToProps)(BoardList)