import React, { useState } from 'react'
import PropTypes from 'prop-types'

// Material UI Components
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import InputBase from '@material-ui/core/InputBase'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import CustomTooltip from '../../../../components/CustomMaterialUI/CustomTooltip'

// Material UI Icons
import PaletteIcon from '@material-ui/icons/Palette'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto'

import Image from '../../../../components/Image'
import ColorPalette from '../ColorPalette'
import styles from './AddBoard.module.scss'

function AddBoard({ boardInfo, onBoardInfoChange, resetBoardInfo }) {

  const [cardIsExpanded, setIsCardExpanded] = useState(false)
  const [imagePreview, setImagePreview] = useState("")

  const expandCard = () => {
    setIsCardExpanded(true)
  }

  const shrinkCard = () => {
    setIsCardExpanded(false)
    resetBoardInfo()
  }

  const handleTextChange = (e) => {
    onBoardInfoChange({ ...boardInfo, [e.target.id]: e.target.value })
  }

  const handleColorChange = (color) => {
    onBoardInfoChange({ ...boardInfo, color })
  }

  const handleImageUpload = (e) => {
    if (e.target.files.length) { // Only update when there is an upload
      setImagePreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  const renderCardContent = () => {
    if (cardIsExpanded) {
      return (
        <>
          {
            imagePreview && <Image src={imagePreview} caption="User uploaded image" />
          }
          <CardHeader
            id="title"
            title={
              <InputBase
                placeholder="Board Title"
                className={styles.titleInput}
                onChange={handleTextChange}
              />
            }
            className={styles.header}
          />
          <CardContent>
            <InputBase
              id="about"
              placeholder="Board About (max 200 characters)"
              className={styles.input}
              onChange={handleTextChange}
              multiline
              rowsMax={5}
            />
          </CardContent>
          <Divider />
          <CardActions className={styles.actions}>
            {/* IconButtons: Change color, Collaborator and Add image */}
            <div>
              <CustomTooltip
                title={
                  <ColorPalette
                    activeColor={boardInfo.color}
                    changeColor={handleColorChange}
                  />
                }
                width="8rem" // Custom width
                interactive
              >
                <PaletteIcon className={styles.icon} />
              </CustomTooltip>
              <CustomTooltip title="Collaborator">
                <GroupAddIcon className={styles.icon} />
              </CustomTooltip>
              <CustomTooltip title="Add image">
                <label htmlFor="image-upload-btn">
                  <InsertPhotoIcon
                    className={styles.icon}
                  />
                </label>
              </CustomTooltip>
              <input
                type="file"
                id="image-upload-btn"
                style={{ display: "none" }}
                accept="image/*" // Accept image input
                onChange={handleImageUpload}
              />
            </div>
            {/* Cancel and Create buttons */}
            <div>
              <Button
                color="default"
                variant="contained"
                size="small"
                className={styles.btn}
                onClick={shrinkCard}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                variant="contained"
                size="small"
                className={styles.btn}
              >
                Create
              </Button>
            </div>
          </CardActions>
        </>
      )
    } else {
      return (
        <CardActionArea onClick={expandCard}>
          <CardHeader subheader="Create a Board..." />
        </CardActionArea>
      )
    }
  }

  return (
    <ClickAwayListener onClickAway={shrinkCard}>
      <Card className={styles.root} style={{ backgroundColor: boardInfo.color }}>
        {renderCardContent()}
      </Card>
    </ClickAwayListener>
  )
}

AddBoard.propTypes = {
  boardInfo: PropTypes.object.isRequired,
  onBoardInfoChange: PropTypes.func.isRequired,
  resetBoardInfo: PropTypes.func.isRequired,
}

export default AddBoard