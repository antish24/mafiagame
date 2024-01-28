import React from 'react'
import styles from './gameplayercard.module.css'

const GamePlayerCard = (l) => {
  return (
    <div className={styles.cont}>
        <div className={styles.picbox}>
            <span className={styles.status} style={{background:l.status==='Ready'?"Green":"red"}}></span>
        </div>
        <div className={styles.userinfo}>
            <span className={styles.name}>{l.name}</span>
            <span className={styles.des}>{l.status==='Ready'?l.status:'No Action'}</span>
        </div>
    </div>
  )
}

export default GamePlayerCard