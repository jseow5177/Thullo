import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core'

/**
 * CustomTooltip with reduced spacing between tooltip and anchor
 */
function CustomTooltip(props) {

  const useTooltipStyles = makeStyles({
    tooltip: {
      margin: 1,
      width: props.width && props.width, // Set width if provided as prop
    },
  })

  const classes = useTooltipStyles()

  return (
    <Tooltip {...props} classes={classes} />
  )
}

export default CustomTooltip