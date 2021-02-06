import React, { forwardRef } from 'react'

import styles from './List.module.scss'

const List = forwardRef(({ title, children, action }, ref) => (
  <div className={styles.root} ref={ref}>
    {title}
    {
      children && children.map((child, index) => <div key={index}>{child}</div>)
    }
    {action}
  </div>
))

export default List