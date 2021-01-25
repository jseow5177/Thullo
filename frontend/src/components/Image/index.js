import React, { useState } from 'react'
import PropTypes from 'prop-types'

import LinearProgress from '@material-ui/core/LinearProgress'

import styles from './Image.module.scss'

function Image({ src, caption, height }) {

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
      <img
        src={src}
        onLoad={handleImageUploaded}
        alt={caption}
        className={styles.image}
        style={{
          display: loaded ? "block" : "none",
          height: height
        }}
      />
    </>
  )

  return (
    <>
      {renderImageComponent()}
    </>
  )
}

Image.defaultProps = {
  height: 'auto'
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  height: PropTypes.string,
}

export default Image