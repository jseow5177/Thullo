import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

import AddBoxIcon from '@material-ui/icons/AddBox'
import CloseIcon from '@material-ui/icons/Close'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import ChooseLabel from '../ChooseLabel'
import LabelForm from '../LabelForm'
import Label from '../Label'
import { addLabel, updateLabel, deleteLabel } from '../../store/actions'
import BOARD from '../../constants'
import styles from './LabelsInput.module.scss'
import labelColors from '../../../../assets/styles/labelColors.module.scss'

function LabelsInput({
  board,
  match,
  selectedLabels,
  onLabelSelect,
  removeSelectedLabel,
  addLabel,
  updateLabel,
  deleteLabel
}) {

  const boardId = match.params.id

  const buttonRef = useRef()

  const [anchorEl, setAnchorEl] = useState(null)

  const [searchKeyword, setSearchKeyword] = useState('')
  const [activeContent, setActiveContent] = useState('choose')
  const [labelInfo, setLabelInfo] = useState({
    id: undefined,
    title: '',
    color: '',
    board: boardId
  })

  const openLabelsInput = () => {
    setAnchorEl(buttonRef.current)
  }

  const closeLabelsInput = () => {
    setAnchorEl(null)
    setSearchKeyword('')
  }

  const handleSearchKeywordChange = (keyword) => {
    setSearchKeyword(keyword)
  }

  const redirectToChoose = () => {
    setActiveContent('choose')
  }

  const redirectToEdit = (labelId) => {
    const clickedLabel = board.labels.find(label => label.id === labelId)

    setLabelInfo({
      ...labelInfo, // To retain the board Id
      ...clickedLabel
    })

    setActiveContent('edit')
  }

  const redirectToNew = () => {
    /**
     * some() method tests whether at least one element in the array passes the test
     *  implemented in the function.
     * 
     * With the "!" bang operator, it returns false whenever color === label.color
     */
    const unusedLabelColors = Object.values(labelColors).filter(color =>
      !board.labels.some(label => color === label.color))

    setLabelInfo({
      ...labelInfo,
      title: searchKeyword,
      color: unusedLabelColors[0]
    })

    setActiveContent('new')
  }

  const redirectToDelete = () => {
    setActiveContent('delete')
  }

  const submitNewLabel = async (labelInfo) => {
    const newlyAddedLabel = await addLabel(labelInfo)

    if (newlyAddedLabel) {
      onLabelSelect(newlyAddedLabel.id)
      setSearchKeyword('')
      redirectToChoose()
    }
  }

  const submitUpdatedLabel = async (labelInfo) => {
    const successfulUpdate = await updateLabel(labelInfo)

    if (successfulUpdate) {
      redirectToChoose()
    }
  }

  const submitDeletedLabel = async () => {
    /**
     * To access the delete page, the user must first visits the update page (through redirectToUpdate).
     * 
     * When redirectToUpdate is called, the labelInfo state will be set to the appropriate label.
     * 
     * Hence, when delete, we can just access the label id via labelInfo.id.
     */
    const successfulDelete = await deleteLabel(labelInfo.id)

    if (successfulDelete) {
      removeSelectedLabel(labelInfo.id) // Remove label from being selected if it is deleted
      redirectToChoose()
    }

  }

  const renderCardContent = () => {
    switch (activeContent) {
      case 'choose':
        return (
          <ChooseLabel
            searchKeyword={searchKeyword}
            selectedLabels={selectedLabels}
            handleSearchKeywordChange={handleSearchKeywordChange}
            handleLabelSelect={onLabelSelect}
            redirectToNew={redirectToNew}
            redirectToEdit={redirectToEdit}
          />
        )
      case 'new':
        return (
          <LabelForm
            label={labelInfo}
            onSubmit={submitNewLabel}
            onCancel={redirectToChoose}
            isCreateNew
          />
        )
      case 'edit':
        return (
          <LabelForm
            label={labelInfo}
            onSubmit={submitUpdatedLabel}
            onCancel={redirectToDelete}
          />
        )
      case 'delete':
        return (
          <>
            <Typography
              variant="body2"
              gutterBottom
            >
              This label will be removed from all cards. It cannot be undone!
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              fullWidth
              onClick={submitDeletedLabel}
            >
              Delete
            </Button>
          </>
        )
      default:
        break
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.labelsWrapper}>
        {
          board.labels
            .filter(boardLabel => selectedLabels.includes(boardLabel.id))
            .map(selectedLabel =>
              <Label
                key={selectedLabel.id}
                title={selectedLabel.title}
                color={selectedLabel.color}
                handleClick={openLabelsInput}
                gutterRight
              />
            )
        }
      </div>
      <IconButton size="small" onClick={openLabelsInput}>
        <AddBoxIcon
          ref={buttonRef}
          className={styles.addIcon}
        />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={closeLabelsInput}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <Card className={styles.card}>
          <CardHeader
            title={
              <Typography variant="subtitle1" className={styles.header}>
                {
                  activeContent !== 'choose' &&
                  <IconButton
                    size="small"
                    className={styles.backIcon}
                    onClick={redirectToChoose}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                }
                {BOARD.LABELS_PAGE_TITLE[activeContent]}
                <IconButton size="small" className={styles.closeIcon} onClick={closeLabelsInput}>
                  <CloseIcon />
                </IconButton>
              </Typography>
            }
          />
          <Divider className={styles.divider} />
          <CardContent className={styles.content}>
            {renderCardContent()}
          </CardContent>
        </Card>
      </Popover>
    </div>
  )
}

const mapStateToProps = (state) => ({
  board: state.board
})

const mapDispatchToProps = (dispatch) => ({
  addLabel: (labelInfo) => dispatch(addLabel(labelInfo)),
  updateLabel: (labelInfo) => dispatch(updateLabel(labelInfo)),
  deleteLabel: (labelId) => dispatch(deleteLabel(labelId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LabelsInput))