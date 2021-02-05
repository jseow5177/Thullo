import React, { useState } from 'react'
import { SortableElement } from 'react-sortable-hoc'
import { withRouter } from 'react-router-dom'

// Material UI Components
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import Image from '../../../../components/Image'

import Default from '../../../../assets/image/default.png'
import styles from './Board.module.scss'

const Board = SortableElement(({ board, history }) => {

  const [raised, setRaised] = useState(false)

  const imgSrc = board.image
    ? `data:image/png;base64,${board.image}`
    : Default // TODO: Find a better image

  const handleMouseOver = () => {
    setRaised(true)
  }

  const handleMouseOut = () => {
    setRaised(false)
  }

  const routeToBoard = () => {
    history.push(`/board/${board.id}`)
  }

  return (
    <div className={styles.root} onClick={routeToBoard}>
      <Card
        className={styles.card}
        style={{ backgroundColor: board.color }}
        raised={raised}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <div className={styles.imgWrapper}>
          <Image src={imgSrc} caption="board img" />
        </div>
        <CardHeader
          title={
            <Typography variant="h6">
              {board.title}
            </Typography>
          }
        />
      </Card>
    </div>
  )
})

export default withRouter(Board)