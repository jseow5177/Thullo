import React, { forwardRef } from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import CustomTooltip from '../../../../components/CustomMaterialUI/CustomTooltip'

import styles from './BoardCard.module.scss'

const ColorTag = forwardRef(({ color, ...props }, ref) => (
  <div
    ref={ref}
    style={{ backgroundColor: color }}
    {...props}
  >
  </div >
))

const ColorTagsWrapper = ({ children, ...props }) => (
  <div {...props}>{children}</div>
)

function BoardCard({ summary, description, labels }) {
  return (
    <Card className={styles.root}>
      <CardContent className={styles.content}>
        {
          labels.length !== 0 &&
          <ColorTagsWrapper className={styles.colorTagsWrapper}>
            {
              labels.map(label =>
                <CustomTooltip
                  key={label.id}
                  title={label.title}
                  placement="top"
                >
                  <ColorTag className={styles.colorTag} color={label.color} />
                </CustomTooltip>
              )
            }
          </ColorTagsWrapper>
        }
        <Typography variant="body2" className={styles.text}>
          {summary}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default BoardCard