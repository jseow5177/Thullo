import React, { useState } from 'react'
import NaturalDragAnimation from 'natural-drag-animation-rbdnd'
import { Draggable } from 'react-beautiful-dnd'

import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Popover from '@material-ui/core/Popover'

import MoreVertIcon from '@material-ui/icons/MoreVert'

import styles from './BoardList.module.scss'

const ListWrapper = ({ provided, children, style }) => (
  <div
    ref={provided.innerRef}
    {...provided.draggableProps}
    className={styles.root}
    style={style}
  >
    {children}
  </div>
)
const ListTitle = ({ children, provided }) => (
  <div
    className={styles.listTitle}
    {...provided.dragHandleProps}
  >
    {children}
  </div>
)

const BoardList = ({ title, index }) => {

  const [anchorEl, setAnchorEl] = useState(null)

  const openPopover = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const closePopover = () => {
    setAnchorEl(null)
  }

  return (
    <Draggable draggableId={title} index={index}>
      {
        (provided, snapshot) => (
          <NaturalDragAnimation
            style={provided.draggableProps.style}
            snapshot={snapshot}
            rotationMultiplier={1} // Reduce rotation degree
          >
            {
              style => (
                <ListWrapper provided={provided} style={style}>
                  <ListTitle provided={provided}>
                    <Typography variant="overline" className={styles.text}>
                      {title}
                    </Typography>
                    <IconButton size="small" onClick={openPopover} className={styles.icon}>
                      <MoreVertIcon />
                    </IconButton>
                    <Popover
                      open={Boolean(anchorEl)}
                      anchorEl={anchorEl}
                      onClose={closePopover}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left"
                      }}
                    >
                      <List dense>
                        <ListItem button>
                          <ListItemText primary="Delete list" />
                        </ListItem>
                      </List>
                    </Popover>
                  </ListTitle>
                </ListWrapper>
              )
            }
          </NaturalDragAnimation>
        )
      }
    </Draggable>
  )
}

export default BoardList