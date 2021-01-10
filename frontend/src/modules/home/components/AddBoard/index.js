import React, { useState } from 'react'

// Material UI Components
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'

// Material UI Icons
import PaletteIcon from '@material-ui/icons/Palette'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto'

import ColorPalette from '../ColorPalette'
import styles from './AddBoard.module.scss'

function AddBoard() {

  const [cardIsExpanded, setIsCardExpanded] = useState(false)

  const expandCard = () => {
    setIsCardExpanded(true)
  }

  const shrinkCard = () => {
    setIsCardExpanded(false)
  }

  const renderCardContent = () => {
    if (cardIsExpanded) {
      return (
        <>
          <CardHeader
            title={<InputBase placeholder="Board Title" className={styles.titleInput} />}
            className={styles.header}
          />
          <CardContent>
            <InputBase placeholder="Board Description (max 200 characters)" className={styles.input} />
          </CardContent>
          <CardActions className={styles.actions}>
            <div>
              <Tooltip title="Change color" className={styles.tooltip}>
                <IconButton className={styles.iconBtn}>
                  <Tooltip title={<ColorPalette />} placement="top" interactive>
                    <PaletteIcon />
                  </Tooltip>
                </IconButton>
              </Tooltip>
              <Tooltip title="Collaborator">
                <IconButton className={styles.iconBtn}>
                  <GroupAddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add image">
                <IconButton className={styles.iconBtn}>
                  <InsertPhotoIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div>
              <Button color="secondary" variant="outlined" size="small" className={styles.btn}>
                Cancel
              </Button>
              <Button color="primary" variant="contained" size="small" className={styles.btn}>
                Create
              </Button>
            </div>
          </CardActions>
        </>
      )
    } else {
      return (
        <CardActionArea onClick={expandCard}>
          <CardHeader subheader="Add a Board..." />
        </CardActionArea>
      )
    }
  }

  return (
    <ClickAwayListener onClickAway={shrinkCard}>
      <Card className={styles.root}>
        {renderCardContent()}
      </Card>
    </ClickAwayListener>
  )
}

export default AddBoard