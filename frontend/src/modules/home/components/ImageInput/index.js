import React, { useState } from 'react'

import UploadIcon from '../../../../assets/icons/upload'

import styles from './ImageInput.module.scss'

const IMAGE_TYPE = ['image/jpeg', 'image/png']

function ImageInput({ handleImageUpload, handleError, clearError }) {

  const [isDragEnter, setIsDragEnter] = useState(false)

  const onImageUpload = (e) => {
    if (e.target.files.length) {
      const rawImage = e.target.files[0]
      handleImageUpload(rawImage)
    }
  }

  const handleDragEnter = e => {
    e.preventDefault()
    e.stopPropagation()

    setIsDragEnter(true)
  }

  const handleDragOver = e => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragLeave = e => {
    e.preventDefault()
    e.stopPropagation()

    setIsDragEnter(false)
  }

  const handleDrop = e => {
    e.preventDefault()
    e.stopPropagation()

    setIsDragEnter(false)

    const rawFile = e.dataTransfer.files[0]

    if (IMAGE_TYPE.includes(rawFile.type)) {
      handleImageUpload(rawFile)
      clearError()
    } else {
      handleError('Only JPG and PNG formats are allowed')
    }
  }

  return (
    <label>
      <div
        className={
          `${styles.imageInputWrapper} ${isDragEnter ? styles.dragEnterPadding : styles.dragLeavePadding}`
        }
      >
        <div
          className={
            `${styles.imageInputArea} ${isDragEnter ? styles.dragEnterColor : styles.dragLeaveColor}`
          }
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          <UploadIcon className={styles.icon} />
          <p className={styles.text}>
            Choose a photo or drag it here
          </p>
          <input
            type="file"
            hidden
            accept={IMAGE_TYPE} // Accept png and jpeg image input
            onChange={onImageUpload}
          />
        </div>
      </div>
    </label>
  )
}

export default ImageInput