import React from 'react'
import styles from './commentcard.module.css'

const CommentCard = (l) => {
  return (
    <div className={styles.cont}>
        <div className={styles.pic}></div>
        <div className={styles.chatcont}>
            <div className={styles.detail}>
                <span className={styles.name}>{l.name}</span>
                <span className={styles.time}>{l.time}</span>
            </div>
            <div className={styles.msg}>{l.msg}</div>
        </div>
    </div>
  )
}

export default CommentCard