import React from 'react'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

function LoadingButton({ children, pending, ...props }) {
  return (
    <Button {...props}>
      { pending
        ? <CircularProgress size={25} style={{ color: '#FFF' }} />
        : children
      }
    </Button>
  )
}

export default LoadingButton