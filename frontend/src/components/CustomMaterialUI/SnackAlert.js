import React from 'react'
import PropTypes from 'prop-types'

// Material UI Components
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import MuiAlert from '@material-ui/lab/Alert'

// Material UI Icons
import CloseIcon from '@material-ui/icons/Close'

const Alert = (props) => (
  <MuiAlert elevation={6} variant="filled" {...props} />
)

function SnackAlert({
  open,
  handleClose,
  message,
  severity,
  autoHideDuration,
  closable,
  verticalAnchor,
  horizontalAnchor
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{
        vertical: verticalAnchor,
        horizontal: horizontalAnchor
      }}
      onClose={handleClose}
      action={
        <IconButton size="small" color="inherit" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    >
      <Alert onClose={handleClose} severity={severity}>{message}</Alert>
    </Snackbar>
  )
}

SnackAlert.defaultProps = {
  open: false,
  handleClose: null,
  autoHideDuration: 5000,
  closable: false,
  verticalAnchor: 'bottom',
  horizontalAnchor: 'left'
}

SnackAlert.propTypes = {
  open: PropTypes.bool,
  handleClose: (props, propName) => {
    if (props['closable'] === true && (props[propName] === undefined || typeof (props[propName]) != 'function')) {
      return new Error('Please provide a handleClose function if closable is true')
    }
  },
  message: PropTypes.string.isRequired,
  severity: PropTypes.string.isRequired,
  autoHideDuration: PropTypes.number,
  closable: PropTypes.bool,
  verticalAnchor: PropTypes.string,
  horizontalAnchor: PropTypes.string,
}

export default SnackAlert