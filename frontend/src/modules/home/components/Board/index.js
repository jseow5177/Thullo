import React, { useState } from 'react'
import { SortableElement } from 'react-sortable-hoc'

// Material UI Components
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import Image from '../../../../components/Image'

import DefaultImage from '../../../../assets/image/default.png'

import styles from './Board.module.scss'

const Board = SortableElement(({ board }) => {
  const [raised, setRaised] = useState(false)

  const imgSrc = board.image
    ? `data:image/png;base64,${board.image}`
    : DefaultImage

  const handleMouseOver = () => {
    setRaised(true)
  }

  const handleMouseOut = () => {
    setRaised(false)
  }

  return (
    <div className={styles.root}>
      <Card
        className={styles.card}
        style={{ backgroundColor: board.color }}
        raised={raised}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <Image
          src={imgSrc}
          caption="board img"
          height="11rem"
        />
        <CardHeader
          title={
            <Typography variant="h5">
              {board.title}
            </Typography>
          }
        />
      </Card>
    </div>
  )
})

export default Board