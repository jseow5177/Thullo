import React from 'react'
import { SortableElement } from 'react-sortable-hoc'

// Material UI Components
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import styles from './Board.module.scss'

const Board = SortableElement(({ board }) => (
  <div>
    <Card className={styles.root}>
      <CardHeader title={board.title} />
      <CardContent>
        {board.about}
      </CardContent>
    </Card>
  </div>
))

export default Board