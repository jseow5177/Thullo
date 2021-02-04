import React, { useState } from 'react'
import PropTypes from 'prop-types'

import LinearProgress from '@material-ui/core/LinearProgress'

import styles from './Image.module.scss'

function Image({ src, caption }) {

  const [loaded, setLoaded] = useState(false)

  const handleImageUploaded = () => {
    setLoaded(true)
  }

  const renderImageComponent = () => (
    <>
      {/* Show progress bar when image is still uploading */}
      <div style={{ display: !loaded ? "block" : "none" }}>
        <LinearProgress color="primary" />
      </div>
      <img
        src={src}
        onLoad={handleImageUploaded}
        alt={caption}
        className={styles.image}
        style={{ display: loaded ? "block" : "none" }}
      />
    </>
  )

  return (
    <>
      {renderImageComponent()}
    </>
  )
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired
}

export default Image