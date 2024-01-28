import React from 'react'
import styles from './smallerror.module.css'

const SmallError = ({color,bg,text}) => {
  return (
    <div className={styles.cont} style={{color:color,background:bg}}>{text}</div>
  )
}

export default SmallError