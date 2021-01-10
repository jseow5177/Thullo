import React from 'react'

import boardColors from '../../../../assets/styles/colors.module.scss'

// Material UI Components
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'

import styles from './ColorPalette.module.scss'

const Circle = ({ name, color }) => {
  return (
    <Tooltip title={name.replace('-', ' ')}>
      <IconButton className={styles.iconBtn}>
        <Avatar style={{ backgroundColor: color }} className={styles.circle}>&nbsp;</Avatar>
      </IconButton>
    </Tooltip>
  )
}

function ColorPalette() {

  const colors = Object.entries(boardColors)

  return (
    <div>
      {
        colors.map(color => (
          <Circle name={color[0]} color={color[1]} />
        ))
      }
    </div>
  )
}

export default ColorPalette