import React, { useState } from 'react'
import { connect } from 'react-redux'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import CheckIcon from '@material-ui/icons/Check'

import labelColors from '../../../../assets/styles/labelColors.module.scss'

import { addLabel } from '../../store/actions'
import styles from './LabelForm.module.scss'

const ColorTag = ({ color, selected, changeColor }) => (
  <Grid item xs="auto" className={styles.colorTagWrapper}>
    <div
      className={styles.colorTag}
      style={{ backgroundColor: color }}
      onClick={() => changeColor(color)}
    >
      {selected ? <CheckIcon className={styles.icon} /> : <>&nbsp;</>}
    </div>
  </Grid>
)

function LabelForm({ label, isCreateNew, onSubmit, onCancel }) {

  const [labelInfo, setLabelInfo] = useState(label)

  const handleLabelTitleChange = (e) => {
    setLabelInfo({ ...labelInfo, title: e.target.value })
  }

  const handleLabelColorChange = (color) => {
    setLabelInfo({ ...labelInfo, color })
  }

  return (
    <>
      <TextField
        variant="outlined"
        size="small"
        label="Name"
        value={labelInfo.title}
        onChange={handleLabelTitleChange}
        fullWidth
        autoFocus
      />
      <Typography variant="overline" className={styles.subheader}>
        Select a color
      </Typography>
      <Grid container spacing={1}>
        {
          Object.values(labelColors).map((color, index) =>
            <ColorTag
              key={index}
              color={color}
              changeColor={handleLabelColorChange}
              selected={color === labelInfo.color}
            />
          )
        }
      </Grid>
      <div className={styles.btnWrapper}>
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={() => onSubmit(labelInfo)}
        >
          {
            isCreateNew ? 'Create' : 'Save'
          }
        </Button>
        <Button
          color="secondary"
          variant="contained"
          size="small"
          onClick={onCancel}
        >
          {
            isCreateNew ? 'Cancel' : 'Delete'
          }
        </Button>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  board: state.board
})

const mapDispatchToProps = (dispatch) => ({
  addLabel: (labelInfo) => dispatch(addLabel(labelInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(LabelForm)