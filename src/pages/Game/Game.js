import React from 'react'
import styles from './game.module.css'
import GamePlayerCard from '../../components/PlayerCard/GamePlayerCard'

const Game = () => {
  const Players=[
    {id:1,name:'player1',status:'Ready'},
    {id:2,name:'player2',status:'no action'},
    {id:3,name:'player3',status:'no action'},
    {id:4,name:'player4',status:'Ready'},
    {id:5,name:'player5',status:'Ready'},
    {id:6,name:'player6',status:'Ready'},
  ]
  return (
    <div className={styles.cont}>
        <span className={styles.title}>Waiting for other players</span>
        <div className={styles.players}>
          {
            Players.map(l=><GamePlayerCard {...l} key={l.id}/>)
          }
        </div>
    </div>
  )
}

export default Game