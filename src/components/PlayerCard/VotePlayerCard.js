import React from 'react'
import styles from './gameplayercard.module.css'

const VotePlayerCard = (l) => {
  return (
    <div className={styles.cont}>
        <div className={styles.picbox}>
            <span className={styles.status} style={{background:l.canVote?"green":'orange'}}></span>
        </div>
        <div className={styles.userinfo}>
            <span className={styles.name}>{l.name}</span>
            <span className={styles.des}>votes: {l.votes?l.votes:0}</span>
        </div>
    </div>
  )
}

export default VotePlayerCard