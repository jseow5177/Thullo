import React, { useState, forwardRef } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import LoadingButton from '../../../../components/CustomMaterialUI/LoadingButton'

import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

import { addList } from '../../store/actions'
import styles from './ListInput.module.scss'

const ClosedInput = ({ children, handleClick }) => (
  <div className={styles.closedInput} onClick={handleClick}>{children}</div>
)

const OpenedInput = forwardRef(({ children }, ref) => (
  <div ref={ref} className={styles.openedInput}>{children}</div>
))

const Actions = ({ children }) => (
  <div className={styles.actions}>{children}</div>
)

function ListInput({ match, addList, board, setSnack }) {

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
    const success = await addList({ board: boardId, title: listTitle })

    if (success) {
      setSnack({
        open: true,
        message: 'List successfully created',
        severity: 'success'
      })
      closeListInput()
    }
  }

  const renderListInput = () => {
    if (isInputOpen) {
      return (
        <ClickAwayListener onClickAway={closeListInput}>
          <OpenedInput>
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
            <Actions>
              <LoadingButton
                variant="contained"
                color="primary"
                size="small"
                disabled={listTitle === ''}
                onClick={createList}
                pending={board.addListLoading}
              >
                Add List
                </LoadingButton>
              <CloseIcon className={styles.icon} onClick={closeListInput} />
            </Actions>
          </OpenedInput>
        </ClickAwayListener>
      )
    } else {
      return (
        <ClosedInput handleClick={openListInput}>
          <AddIcon className={styles.icon} />
          <Typography variant="overline">
            Add a list
          </Typography>
        </ClosedInput>
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

const mapStateToProps = (state) => ({
  board: state.board
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListInput))