import React, { useState } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import LabelsInput from '../LabelsInput'

import TitleIcon from '@material-ui/icons/Title' // For summary
import NotesIcon from '@material-ui/icons/Notes' // For description
import LabelIcon from '@material-ui/icons/Label' // For label
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount' // For reporter
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle' // For assignee

import styles from './CardInputDialog.module.scss'
import { addCard } from '../../store/actions'
import appColors from '../../../../assets/styles/colors.module.scss'
import { Typography } from '@material-ui/core'

const Input = ({ icon, label, inputComponent }) => (
  <div className={styles.inputWrapper}>
    {icon}
    <div className={styles.input}>
      <Typography variant="body1" gutterBottom>
        {label}
      </Typography>
      {inputComponent}
    </div>
  </div>
)

const reactSelectCustomStyles = {
  control: (provided, state) => ({
    ...provided,
    boxShadow: 'none',
    border: state.isFocused && `2px solid ${appColors.PrimaryBlue}`,

    '&:hover': {
      border: !state.isFocused && `1px solid ${appColors.Black}`,
    },
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    backgroundColor: appColors.VeryLightBlue,
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    backgroundColor: appColors.VeryLightBlue,

    '&:hover': {
      backgroundColor: appColors.PrimaryBlue,
      color: appColors.White
    }
  })
}

function CardInputDialog({ board, open, handleClose, addCard, listId }) {

  const [cardInfo, setCardInfo] = useState({
    summary: '',
    description: '',
    labels: [],
    reporters: [],
    assignees: [],
    listId
  })
  const [summaryError, setSummaryError] = useState('')

  const handleSummaryChange = (e) => {
    setSummaryError('')
    setCardInfo({ ...cardInfo, summary: e.target.value })
  }

  const handleDescriptionChange = (e) => {
    setCardInfo({ ...cardInfo, description: e.target.value })
  }

  const handleLabelsChange = (labelId) => {
    const foundLabelId = cardInfo.labels.find(label => label === labelId)

    // If not selected, select it
    if (foundLabelId === undefined) {
      setCardInfo({ ...cardInfo, labels: [...cardInfo.labels, labelId] })
      // If selected, unselect it
    } else {
      removeSelectedLabel(labelId)
    }
  }

  const removeSelectedLabel = (labelId) => {
    const newLabels = cardInfo.labels.filter(label => label !== labelId)
    setCardInfo({ ...cardInfo, labels: newLabels })
  }

  const handleCollabortorsChange = (arr, id) => {
    setCardInfo({ ...cardInfo, [id]: arr })
  }

  const submitCardInfo = async () => {
    const isSavedSuccess = await addCard(cardInfo)

    if (isSavedSuccess) {
      handleClose() // Close Dialog when save is successful
    }
  }

  const validateSummaryInput = () => {
    if (cardInfo.summary === '') {
      setSummaryError("Card Summary is required")
    }
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Create Card</DialogTitle>
      <DialogContent>
        {/* Card Summary */}
        <Input
          icon={<TitleIcon className={styles.icon} />}
          label="Card Summary"
          inputComponent={
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Describe your card..."
              value={cardInfo.summary}
              onChange={handleSummaryChange}
              onBlur={validateSummaryInput}
              error={summaryError !== ''}
              helperText={summaryError}
            />
          }
        />
        {/* Card Labels */}
        <Input
          icon={<LabelIcon className={styles.icon} />}
          label="Label"
          inputComponent={
            <LabelsInput
              selectedLabels={cardInfo.labels}
              onLabelSelect={handleLabelsChange}
              removeSelectedLabel={removeSelectedLabel}
            />
          }
        />
        {/* Card Description */}
        <Input
          icon={<NotesIcon className={styles.icon} />}
          label="Description"
          inputComponent={
            <TextField
              variant="outlined"
              multiline
              rows={4}
              size="small"
              fullWidth
              placeholder={"Add a more detailed description to your card..."}
              value={cardInfo.description}
              onChange={handleDescriptionChange}
            />
          }
        />
        {/* Assignee */}
        <Input
          icon={<SupervisedUserCircleIcon className={styles.icon} />}
          label="Assignee"
          inputComponent={
            <Select
              id="assignees"
              styles={reactSelectCustomStyles}
              isMulti
              options={board.collaborators}
              isSearchable
              isClearable
              onChange={(arr) => handleCollabortorsChange(arr, "assignees")}
            />
          }
        />
        {/* Reporter */}
        <Input
          icon={<SupervisorAccountIcon className={styles.icon} />}
          label="Reporter"
          inputComponent={
            <Select
              id="reporters"
              styles={reactSelectCustomStyles}
              isMulti
              options={board.collaborators}
              isSearchable
              isClearable
              onChange={(arr) => handleCollabortorsChange(arr, "reporters")}
            />
          }
        />
      </DialogContent>
      <DialogActions className={styles.actions}>
        <Button
          variant="contained"
          color="primary"
          onClick={submitCardInfo}
          disabled={cardInfo.summary === ''}
        >
          Create
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const mapStateToProps = (state) => ({
  board: state.board
})

const mapDispatchToProps = (dispatch) => ({
  addCard: (cardInfo) => dispatch(addCard(cardInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(CardInputDialog)