import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Cropper from 'react-easy-crop'
import imageCompression from 'browser-image-compression'

// Material UI Components
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import SnackAlert from '../../../../components/CustomMaterialUI/SnackAlert'
import LoadingButton from '../../../../components/CustomMaterialUI/LoadingButton'

import DeleteIcon from '@material-ui/icons/Delete'

import ImageInput from '../ImageInput'
import styles from './ImageCropper.module.scss'
import { getCroppedImage } from '../../utils'

function ImageCropper({ open, closeImageCropper, handleCroppedImage }) {
  const [image, setImage] = useState({
    src: '',
    preview: null
  })
  const [snack, setSnack] = useState({
    open: false,
    message: '',
    severity: 'error'
  })
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [processing, setProcessing] = useState(false)

  const closeSnack = () => {
    setSnack({ open: false, message: '', severity: 'error' })
  }

  const handleImageUploadError = (errorMsg) => {
    setSnack({ open: true, message: errorMsg, severity: 'error' })
  }

  const handleImageZoom = (_, zoom) => {
    setZoom(zoom)
  }

  const handleImageRotation = (_, rotation) => {
    setRotation(rotation)
  }

  const handleImageUpload = (imgSrc) => {
    setImage({ src: imgSrc, preview: URL.createObjectURL(imgSrc) })
  }

  const handleCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const resetImageInputs = () => {
    setImage({ src: '', preview: null })
  }

  const cropImage = async () => {
    setProcessing(true)

    try {
      const croppedImage = await getCroppedImage(image.preview, croppedAreaPixels, rotation)

      const options = {
        maxSizeMB: 0.5, // Restrict image to be lower than 500kb
        useWebWorker: true
      }
      const compressedImage = await imageCompression(croppedImage, options)

      handleCroppedImage(compressedImage)
      closeImageCropper()
      return true
    } catch (err) {
      setSnack({
        open: true,
        message: 'Image crop fail. Please try again',
        severity: 'error'
      })
      setProcessing(false)
      return false
    }
  }

  const renderImageDisplay = () => {
    if (image.src === '') {
      return (
        <ImageInput
          handleImageUpload={handleImageUpload}
          handleError={handleImageUploadError}
          clearError={closeSnack}
        />
      )
    } else {
      return (
        <>
          <div className={styles.cropper}>
            <DeleteIcon className={styles.icon} onClick={resetImageInputs} />
            <Cropper
              image={image.preview}
              crop={crop}
              rotation={rotation}
              minZoom={0.1}
              zoom={zoom}
              cropSize={{ width: 300, height: 200 }}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropChange={setCrop}
              onCropComplete={handleCropComplete}
              restrictPosition={false}
            />
          </div>
          <div className={styles.controls}>
            <div className={styles.sliderWrapper}>
              <Typography variant="overline" className={styles.label}>
                Zoom
              </Typography>
              <Slider
                value={zoom}
                min={0.1}
                max={3}
                step={0.1}
                onChange={handleImageZoom}
                valueLabelDisplay="auto"
                className={styles.slider}
              />
            </div>
            <div className={styles.sliderWrapper}>
              <Typography variant="overline" className={styles.label}>
                Rotation
              </Typography>
              <Slider
                value={rotation}
                min={0}
                max={360}
                step={1}
                onChange={handleImageRotation}
                valueLabelDisplay="auto"
                className={styles.slider}
              />
            </div>
          </div>
        </>
      )
    }
  }

  return (
    <>
      <Dialog open={open} className={styles.root}>
        <DialogTitle>Upload Image</DialogTitle>
        <DialogContent>
          {renderImageDisplay()}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={closeImageCropper}
          >
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            onClick={cropImage}
            pending={processing}
            disabled={image.src === ''}
          >
            Done
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <SnackAlert
        open={snack.open}
        message={snack.message}
        severity={snack.severity}
        closable={true}
        handleClose={closeSnack}
      />
    </>
  )
}

ImageCropper.defaultProps = {
  open: false
}

ImageCropper.propTypes = {
  open: PropTypes.bool,
}

export default ImageCropper