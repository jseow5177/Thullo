import React, { useState } from 'react'
import { connect } from 'react-redux'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

import EditIcon from '@material-ui/icons/Edit'

import Label from '../Label'
import styles from './ChooseLabel.module.scss'

function ChooseLabel({
  board,
  searchKeyword,
  handleSearchKeywordChange,
  handleLabelSelect,
  selectedLabels,
  redirectToNew,
  redirectToEdit
}) {

  const [filteredBoardLabels, setFilteredBoardLabels] = useState(board.labels)

  const performFilter = (e) => {
    const searchKeyword = e.target.value
    handleSearchKeywordChange(searchKeyword)

    setFilteredBoardLabels(board.labels.filter(boardLabel => {
      return boardLabel.title.toLowerCase().includes(searchKeyword.toLowerCase())
    }))
  }

  return (
    <div className={styles.chooseLabelWrapper}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search labels..."
        value={searchKeyword}
        onChange={performFilter}
        fullWidth
        autoFocus
      />
      <Typography variant="overline" className={styles.subheader}>
        Labels
      </Typography>
      {
        filteredBoardLabels.map(label => (
          <div className={styles.labelsWrapper} key={label.id}>
            <Label
              title={label.title}
              color={label.color}
              handleClick={() => handleLabelSelect(label.id)}
              fullWidth
              selected={selectedLabels.includes(label.id)}
              hover
            />
            <IconButton size="small" onClick={redirectToEdit}>
              <EditIcon />
            </IconButton>
          </div>
        ))
      }
      <Button
        variant="contained"
        className={styles.btn}
        fullWidth
        onClick={redirectToNew}
      >
        <Typography variant="body1">
          Create a new
          {filteredBoardLabels.length === 0 ? ` "${searchKeyword}" ` : ' '}
          label
        </Typography>
      </Button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  board: state.board
})

export default connect(mapStateToProps, null)(ChooseLabel)