import React from 'react'
import PropTypes from 'prop-types'

// All available board colors
import boardColors from '../../../../assets/styles/colors.module.scss'

// Material UI Components
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import CustomTooltip from '../../../../components/CustomMaterialUI/CustomTooltip'

// Material UI Icons
import CheckIcon from '@material-ui/icons/Check'

import styles from './ColorPalette.module.scss'

const Circle = ({ name, color, isActive, changeColor }) => {

  const isActiveRender = () => {
    if (isActive) {
      // Display tick inside circle when color is selected
      return <CheckIcon className={styles.tick} />
    } else {
      return <>&nbsp;</>
    }
  }

  return (
    <CustomTooltip title={name.replace('-', ' ')}>
      <Grid item xs={3} className={styles.circleWrapper}>
        <Avatar style={{ backgroundColor: color }} className={styles.circle} onClick={() => changeColor(color)}>
          {isActiveRender()}
        </Avatar>
      </Grid>
    </CustomTooltip>
  )
}

function ColorPalette({ activeColor, changeColor }) {

  const colors = Object.entries(boardColors)

  const renderColorCircles = () => (
    colors.map((color, index) => (
      /**
       * color[0] is the name of color.
       * color[1] is the hex code of color.
       */
      <Circle
        key={index}
        name={color[0]}
        color={color[1]}
        isActive={activeColor === color[1]}
        changeColor={changeColor}
      />
    ))
  )

  return (
    <>
      <p className={styles.paletteTitle}>Change Color</p>
      <Grid container spacing={1}>
        {renderColorCircles()}
      </Grid>
    </>
  )
}

Circle.defaultProps = {
  isActive: false
}

Circle.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  changeColor: PropTypes.func.isRequired,
}

ColorPalette.propTypes = {
  activeColor: PropTypes.string.isRequired,
  changeColor: PropTypes.func.isRequired,
}

export default ColorPalette