import React, { useEffect, useState } from 'react'
import styles from './room.module.css'
import PlayerCard from '../../components/PlayerCard/PlayerCard'
import {useNavigate,useParams } from 'react-router-dom'
import axios from 'axios'
import { BACKENDURL } from '../../helper/Url'

const Room = () => {
  const params =useParams()
  const gameCode=params.gamecode

    const [Players,setPlayers]=useState([])
    const [playerCount,setPlayerCount]=useState()
    const [playerSize,setPlayerSize]=useState()
    const [kick,setKick]=useState()
    const [canKick,setCanKick]=useState()

    const navigate=useNavigate()

    useEffect(()=>{
      const getPlayers=async()=>{
        try {
          let token = localStorage.getItem ('gameUserToken');
          const res=await axios.post(`${BACKENDURL}/game/players`,{token:token,gameCode:gameCode})
          setPlayers(res.data.players)
          setKick(res.data.kick)
          setCanKick(res.data.canKick)
          setPlayerSize(res.data.playerSize)
          setPlayerCount(res.data.playerCount)
        } catch (error) {
          console.log(error)
        navigate('/home')
        }
      }
      getPlayers()
    },[gameCode,navigate])
    
    const StartGame=async()=>{
      navigate('/role')
    }
  return (
    <div className={styles.cont}>
        <span className={styles.title}>Game Name</span>
        <span className={styles.subtitle}>Player ({playerCount}/{playerSize})</span>
        <div className={styles.players}>
            {Players.map(l=><PlayerCard key={l._id} {...l}/>)}
        </div>
        <div className={styles.sharebox}></div>
        <button className={styles.startbtn} disabled={(playerCount!==playerSize)||kick!==canKick} onClick={StartGame}>Start game!</button>
        <span className={styles.btninfo}>the game can be started by the room owner now!</span>
    </div>
  )
}

export default Room