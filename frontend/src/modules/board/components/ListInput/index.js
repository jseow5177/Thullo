import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

import List from '../List'
import { addList } from '../../store/actions'
import styles from './ListInput.module.scss'

function ListInput({ match, addList }) {

  const boardId = match.params.id

  const [listTitle, setListTitle] = useState('')
  const [isInputOpen, setIsInputOpen] = useState(false)

  const openListInput = () => {
    setIsInputOpen(true)
  }

  const closeListInput = () => {
    setIsInputOpen(false)
    setListTitle('') // Clear input
  }

  const handleTextChange = (e) => {
    setListTitle(e.target.value)
  }

  const createList = async () => {
    await addList({ board: boardId, title: listTitle })
  }

  const renderListInput = () => {
    if (isInputOpen) {
      return (
        <ClickAwayListener onClickAway={closeListInput}>
          <List
            title={
              <TextField
                variant="outlined"
                placeholder="Enter list title..."
                size="small"
                fullWidth
                autoFocus
                value={listTitle}
                onChange={handleTextChange}
                className={styles.input}
              />
            }
            action={
              <div className={styles.actions}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  disabled={listTitle === ''}
                  onClick={createList}
                >
                  Add List
                </Button>
                <CloseIcon className={styles.icon} onClick={closeListInput} />
              </div>
            }
          />
        </ClickAwayListener>
      )
    } else {
      return (
        <div className={styles.root} onClick={openListInput}>
          <AddIcon className={styles.icon} />
          <Typography variant="overline">
            Add a list
          </Typography>
        </div>
      )
    }
  }

  return (
    <>
      {renderListInput()}
    </>
  )
}

const mapDispatchToProps = (dispatch) => ({
  addList: (listInfo) => dispatch(addList(listInfo))
})

export default withRouter(connect(null, mapDispatchToProps)(ListInput))