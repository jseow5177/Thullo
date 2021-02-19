import React, { useState } from 'react'
import { connect } from 'react-redux'

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
import LoadingButton from '../../../../components/CustomMaterialUI/LoadingButton'

// Material UI Icons
import PaletteIcon from '@material-ui/icons/Palette'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto'

// All available board colors
import boardColors from '../../../../assets/styles/boardColors.module.scss'

import { getBoardDefaultLabels } from '../../utils'
import { addBoard } from '../../store/actions'
import Image from '../../../../components/Image'
import ColorPalette from '../ColorPalette'
import ImageCropper from '../ImageCropper'
import styles from './AddBoard.module.scss'

function AddBoard({ addBoard, setSnack, home }) {

  const [boardInfo, setBoardInfo] = useState({
    title: '',
    about: '',
    color: boardColors.Default,
    image: ''
  })
  const [imagePreview, setImagePreview] = useState('')
  const [cardIsExpanded, setIsCardExpanded] = useState(false)
  const [isImageCropperOpen, setIsImageCropperOpen] = useState(false)

  const openImageCropper = () => {
    setIsImageCropperOpen(true)
  }

  const closeImageCropper = () => {
    setIsImageCropperOpen(false)
  }

  const expandCard = () => {
    setIsCardExpanded(true)
  }

  const shrinkCard = () => {
    setIsCardExpanded(false)
    resetBoardInfo() // Clear board info
    setImagePreview('') // Clear image preview
  }

  const handleTextChange = (e) => {
    setBoardInfo({ ...boardInfo, [e.target.id]: e.target.value })
  }

  const handleColorChange = (color) => {
    setBoardInfo({ ...boardInfo, color })
  }

  const handleCroppedImage = (imgSrc) => {
    setImagePreview(URL.createObjectURL(imgSrc))
    setBoardInfo({ ...boardInfo, image: imgSrc })
  }

  const resetBoardInfo = () => {
    setBoardInfo({
      title: '',
      about: '',
      color: boardColors.Default,
      image: ''
    })
  }

  const submitBoardInfo = async () => {
    const boardFormData = new FormData()

    const lastBoard = home.boards[home.boards.length - 1]

    boardFormData.append('title', boardInfo.title)
    boardFormData.append('about', boardInfo.about)
    boardFormData.append('color', boardInfo.color)
    boardFormData.append('image', boardInfo.image)
    boardFormData.append('order', lastBoard ? lastBoard.order + 1 : 1)
    boardFormData.append('labels', JSON.stringify(getBoardDefaultLabels()))

    const success = await addBoard(boardFormData)

    if (success) {
      setSnack({
        open: true,
        message: 'Board successfully created',
        severity: 'success'
      })
      shrinkCard()
    }
  }

  const renderCardContent = () => {
    if (cardIsExpanded) {
      return (
        <>
          {
            imagePreview &&
            <div className={styles.imgWrapper}>
              <Image src={imagePreview} caption="User Uploaded Image" />
            </div>
          }
          <CardHeader
            title={
              <InputBase
                id="title"
                placeholder="Board Title"
                className={styles.titleInput}
                onChange={handleTextChange}
                autoComplete="off"
              />
            }
            className={styles.header}
          />
          <CardContent>
            <InputBase
              id="about"
              placeholder="Board About"
              className={styles.input}
              onChange={handleTextChange}
              multiline
              rowsMax={5}
            />
          </CardContent>
          <Divider />
          <CardActions className={styles.actions}>
            <div>
              {/* Change Color */}
              <CustomTooltip
                title={
                  <ColorPalette
                    activeColor={boardInfo.color}
                    changeColor={handleColorChange}
                  />
                }
                width="8rem" // Custom width
                interactive // Allows user to click on it
              >
                <PaletteIcon className={styles.icon} />
              </CustomTooltip>
              {/* Collaborator */}
              <CustomTooltip title="Collaborator">
                <GroupAddIcon className={styles.icon} />
              </CustomTooltip>
              {/* Image Upload */}
              <CustomTooltip title="Add image">
                <InsertPhotoIcon
                  className={styles.icon}
                  onClick={openImageCropper}
                />
              </CustomTooltip>
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
                Close
              </Button>
              <LoadingButton
                color="primary"
                variant="contained"
                size="small"
                className={styles.btn}
                pending={home.addBoardLoading}
                disabled={boardInfo.title === ''}
                onClick={submitBoardInfo}
              >
                Create
              </LoadingButton>
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
    <>
      <ClickAwayListener onClickAway={shrinkCard}>
        <Card className={styles.root} style={{ backgroundColor: boardInfo.color }}>
          {renderCardContent()}
          {
            isImageCropperOpen &&
            <ImageCropper
              open={isImageCropperOpen}
              closeImageCropper={closeImageCropper}
              handleCroppedImage={handleCroppedImage}
            />
          }
        </Card>
      </ClickAwayListener>
    </>
  )
}

const mapStateToProps = (state) => ({
  home: state.home
})

const mapDispatchToProps = (dispatch) => ({
  addBoard: (boardFormData) => dispatch(addBoard(boardFormData))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddBoard)