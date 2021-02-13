import React, { useState } from 'react'

import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'

import styles from './CardInput.module.scss'
import CardInputDialog from '../CardInputDialog'

const CardInputWrapper = ({ children, ...props }) => (
  <div {...props}>{children}</div >
)

function CardInput() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openCardInputDialog = () => {
    setIsDialogOpen(true)
  }

  const closeCardInputDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <>
      <CardInputWrapper className={styles.cardInputWrapper} onClick={openCardInputDialog}>
        <AddIcon className={styles.icon} />
        <Typography variant="body2" className={styles.text}>
          Add a Card
        </Typography>
      </CardInputWrapper>
      <CardInputDialog open={isDialogOpen} handleClose={closeCardInputDialog} />
    </>
  )
}

export default CardInput