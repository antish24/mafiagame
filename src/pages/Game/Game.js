import React, { useEffect, useState } from 'react'
import styles from './game.module.css'
import GamePlayerCard from '../../components/PlayerCard/GamePlayerCard'
import axios from 'axios'
import { BACKENDURL } from '../../helper/Url'

const Game = () => {
  const [Players,setPlayers]=useState([])
  const [PlayersReady,setPlayersReady]=useState([])
  useEffect(()=>{
      const getPlayers=async()=>{
        try {
          let token = localStorage.getItem ('gameUserToken');
          let gameCode = localStorage.getItem ('playerGameCode');
          const res=await axios.post(`${BACKENDURL}/game/gameplayers`,{token:token,gameCode:gameCode})
          setPlayersReady(res.data.ready)
          setPlayers(res.data.players)
        } catch (error) {
          console.log(error)
        }
      }
      getPlayers()
    },[])
  return (
    <div className={styles.cont}>
        <span className={styles.title}>{PlayersReady?"Players are Ready!":"Waiting for other players"}</span>
        <div className={styles.players}>
          {
            Players.map(l=><GamePlayerCard {...l} key={l._id}/>)
          }
        </div>
    </div>
  )
}

export default Game