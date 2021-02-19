import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

import AddBoxIcon from '@material-ui/icons/AddBox'
import CloseIcon from '@material-ui/icons/Close'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import ChooseLabel from '../ChooseLabel'
import NewLabel from '../NewLabel'
import Label from '../Label'
import styles from './LabelsInput.module.scss'

function LabelsInput({ board, onLabelSelect, selectedLabels }) {

  const buttonRef = useRef()

  const [anchorEl, setAnchorEl] = useState(null)

  const [searchKeyword, setSearchKeyword] = useState('')
  const [activeContent, setActiveContent] = useState('choose')

  const openLabelsInput = () => {
    setAnchorEl(buttonRef.current)
  }

  const closeLabelsInput = () => {
    setAnchorEl(null)
  }

  const handleSearchKeywordChange = (keyword) => {
    setSearchKeyword(keyword)
  }

  const renderCardContent = () => {
    switch (activeContent) {
      case 'choose':
        return (
          <ChooseLabel
            searchKeyword={searchKeyword}
            handleSearchKeywordChange={handleSearchKeywordChange}
            handleLabelSelect={onLabelSelect}
            selectedLabels={selectedLabels}
            redirectToNew={() => setActiveContent('new')}
            redirectToEdit={() => setActiveContent('edit')}
          />
        )
      case 'new':
        return (
          <NewLabel
            searchKeyword={searchKeyword}
            handleLabelSelect={onLabelSelect}
            redirectToChoose={() => setActiveContent('choose')}
          />
        )
      case 'edit':
        return (
          <>
            <h1>Edit</h1>
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
          vertical: "bottom",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
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
                    onClick={() => setActiveContent('choose')}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                }
                Label
                <IconButton size="small" className={styles.closeIcon} onClick={closeLabelsInput}>
                  <CloseIcon />
                </IconButton>
              </Typography>
            }
          />
          <Divider className={styles.divider} />
          <CardContent>
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

export default connect(mapStateToProps, null)(LabelsInput)