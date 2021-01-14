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
      {/* Show progress bar when image is not yet loaded */}
      <div style={{ display: loaded ? "none" : "block" }}>
        <LinearProgress color="primary" />
      </div>
      <div style={{ display: loaded ? "block" : "none" }}>
        <img
          src={src}
          onLoad={handleImageUploaded}
          alt={caption}
          className={styles.image}
        />
      </div>
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
  caption: PropTypes.string.isRequired,
}

export default Image