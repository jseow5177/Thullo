import React, { useState } from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import TextEditor from '../TextEditor'

import TitleIcon from '@material-ui/icons/Title' // For summary
import NotesIcon from '@material-ui/icons/Notes' // For description
import LabelIcon from '@material-ui/icons/Label' // For label
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount' // For reporter
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle' // For assignee

import styles from './CardInputDialog.module.scss'
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

function CardInputDialog({ open, handleClose }) {

  const [cardInfo, setCardInfo] = useState({
    summary: '',
    description: '',
    labels: [],
    reporters: [],
    assignees: []
  })

  const handleSummaryChange = (e) => {
    setCardInfo({ ...cardInfo, summary: e.target.value })
  }

  const handleDescriptionChange = (value) => {
    setCardInfo({ ...cardInfo, description: value })
  }

  console.log(cardInfo.description)

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Create Card</DialogTitle>
      <DialogContent>
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
            />
          }
        />
        <Input
          icon={<NotesIcon className={styles.icon} />}
          label="Description"
          inputComponent={
            <TextEditor
              placeholder="Add a more detailed description of your card..."
              value={cardInfo.description}
              handleChange={handleDescriptionChange}
            />
          }
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
        >
          Create
        </Button>
        <Button
          variant="outlined"
          color="secondary"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CardInputDialog