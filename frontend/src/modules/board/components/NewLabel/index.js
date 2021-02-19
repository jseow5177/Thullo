import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import CheckIcon from '@material-ui/icons/Check'

import labelColors from '../../../../assets/styles/labelColors.module.scss'

import { addLabel } from '../../store/actions'
import styles from './NewLabel.module.scss'

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

function NewLabel({ board, searchKeyword, match, handleLabelSelect, addLabel, redirectToChoose }) {

  const boardId = match.params.id

  const [newLabelInfo, setNewLabelInfo] = useState({
    title: searchKeyword,
    color: '',
    board: boardId
  })

  const handleNewLabelTitleChange = (e) => {
    setNewLabelInfo({ ...newLabelInfo, title: e.target.value })
  }

  const handleNewLabelColorChange = (color) => {
    setNewLabelInfo({ ...newLabelInfo, color })
  }

  useEffect(() => {
    /**
     * some() method tests whether at least one element in the array passes the test
     *  implemented in the function.
     * 
     * With the "!" bang operator, it returns false whenever color === label.color
     */
    const unusedLabelColors = Object.values(labelColors).filter(color =>
      !board.labels.some(label => color === label.color))

    if (unusedLabelColors.length !== 0) {
      setNewLabelInfo(newLabelInfo => ({ ...newLabelInfo, color: unusedLabelColors[0] }))
    }
  }, [board.labels])

  const submitLabelInfo = async () => {
    const newlyAddedLabel = await addLabel(newLabelInfo)

    if (newlyAddedLabel) {
      handleLabelSelect(newlyAddedLabel.id)
      redirectToChoose()
    }
  }

  return (
    <>
      <TextField
        variant="outlined"
        size="small"
        label="Name"
        value={newLabelInfo.title}
        onChange={handleNewLabelTitleChange}
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
              changeColor={handleNewLabelColorChange}
              selected={color === newLabelInfo.color}
            />
          )
        }
      </Grid>
      <div className={styles.btnWrapper}>
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={submitLabelInfo}
        >
          Create
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewLabel))