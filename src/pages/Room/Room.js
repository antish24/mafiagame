import React, { useEffect, useState } from 'react'
import styles from './room.module.css'
import PlayerCard from '../../components/PlayerCard/PlayerCard'
import {useNavigate,useParams } from 'react-router-dom'
import axios from 'axios'
import { BACKENDURL } from '../../helper/Url'
import { FaCopy } from 'react-icons/fa'

const Room = () => {
  const params =useParams()
  const gameCode=params.gamecode

    const [Players,setPlayers]=useState([])
    const [playerCount,setPlayerCount]=useState()
    const [playerSize,setPlayerSize]=useState()
    const [roomName,setRoomName]=useState()
    const [kick,setKick]=useState()
    const [canKick,setCanKick]=useState()

    const navigate=useNavigate()

    useEffect(()=>{
      const getPlayers=async()=>{
        try {
          let token = localStorage.getItem ('gameUserToken');
          const res=await axios.post(`${BACKENDURL}/game/players`,{token:token,gameCode:gameCode})
          setPlayers(res.data.players)
          console.log(res.data)
          setKick(res.data.kick)
          setRoomName(res.data.RoomName)
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

    const [isCopy,setIsCopy]=useState(false)
    const copyFun=async()=>{
      await navigator.clipboard.writeText(gameCode)
      setIsCopy(true)
      setTimeout(() => {
        setIsCopy(false);
      }, 3000);
    }

  return (
    <div className={styles.cont}>
        <span className={styles.title}>{roomName}</span>
        <span className={styles.subtitle}>Player ({playerCount}/{playerSize})</span>
        <div className={styles.players}>
            {Players.map(l=><PlayerCard key={l._id} {...l}/>)}
        </div>
        <div className={styles.sharebox}>{gameCode}<FaCopy color={isCopy?'green':"gray"} onClick={copyFun}/>{isCopy&&"Copied"}</div>
        <button className={styles.startbtn} disabled={(playerCount!==playerSize)||kick!==canKick} onClick={StartGame}>Start game!</button>
        <span className={styles.btninfo}>the game can be started by the room owner now!</span>
    </div>
  )
}

export default Room