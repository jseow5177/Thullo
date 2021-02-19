import React from 'react'

import Typography from '@material-ui/core/Typography'
import CheckIcon from '@material-ui/icons/Check'

import styles from './Label.module.scss'

const Label = ({
  title,
  color,
  selected,
  fullWidth,
  handleClick,
  hover, // Boolean that indicates if there should be a hover effect
  gutterRight // Boolean that indicates a spacing on the right
}) => (
  <div
    className={
      `
      ${styles.label} 
      ${hover ? styles.hoverEffect : ''}
      ${gutterRight ? styles.rightMargin : ''}
      `
    }
    onClick={handleClick}
    style={{
      backgroundColor: color,
      width: fullWidth ? '100%' : 'fit-content'
    }}
  >
    <Typography variant="body1" className={styles.labelTitle}>
      {title}
    </Typography>
    {selected && <CheckIcon className={styles.checkIcon} />}
  </div>
)

export default Label