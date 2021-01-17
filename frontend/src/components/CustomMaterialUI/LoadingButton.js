import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

function LoadingButton({ children, pending, ...props }) {
  const [btnSize, setBtnSize] = useState(0)
  const btnRef = useRef(null)

  useEffect(() => {
    const { clientHeight, clientWidth } = btnRef.current
    setBtnSize(Math.min(clientHeight, clientWidth))
  }, [])

  return (
    <Button {...props} ref={btnRef}>
      {
        pending
          ? <CircularProgress size={0.75 * btnSize} style={{ color: '#FFF' }} />
          : children
      }
    </Button>
  )
}

LoadingButton.defaultProps = {
  pending: false
}

LoadingButton.propTypes = {
  pending: PropTypes.bool,
}

export default LoadingButton