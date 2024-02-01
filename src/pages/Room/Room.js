import React, { useEffect, useState } from 'react'
import styles from './room.module.css'
import PlayerCard from '../../components/PlayerCard/PlayerCard'
import {useNavigate,useParams } from 'react-router-dom'
import axios from 'axios'
import { BACKENDURL } from '../../helper/Url'
import { FaCopy } from 'react-icons/fa'

const Room = ({socket}) => {
  const params =useParams()
  const gameCode=params.gamecode
  localStorage.setItem('playerGameCode',gameCode)

    const [starting,setStarting]=useState(false)
    const [closing,setClosing]=useState(false)

    const [Players,setPlayers]=useState([])
    const [playerCount,setPlayerCount]=useState()
    const [playerSize,setPlayerSize]=useState()
    const [roomName,setRoomName]=useState()
    const [roomError,setRoomError]=useState(false)
    const [roomErrorMsg,setRoomErrorMsg]=useState('')
    const [kick,setKick]=useState()
    const [canKick,setCanKick]=useState()

    const navigate=useNavigate()

    const getPlayers=async()=>{
      try {
        let token = localStorage.getItem ('gameUserToken');
        const res=await axios.post(`${BACKENDURL}/game/players`,{token:token,gameCode:gameCode})
        if(res.data.playerStatus)navigate('/role')
        setPlayers(res.data.players)
        setKick(res.data.kick)
        setRoomName(res.data.RoomName)
        setCanKick(res.data.canKick)
        setPlayerSize(res.data.playerSize)
        setPlayerCount(res.data.playerCount)
      } catch (error) {
        setRoomErrorMsg(error.response.data.message)
        setRoomError(true)
        console.log(error)
      }
    }

    socket.on('new player', (data) => {
      // Handle the message event from the server
      console.log('Received message:', data);
      getPlayers()
      // ... handle the received message ...
    });

    socket.on('go to role', (data) => {
      // Handle the message event from the server
      console.log('Received message:', data);
      navigate('/role')
      // ... handle the received message ...
    });

    socket.on('closed game', (data) => {
      // Handle the message event from the server
      console.log('Received message:', data);
      navigate('/home')
      // ... handle the received message ...
    });

    useEffect(()=>{
      const getPlayers=async()=>{
        try {
          let token = localStorage.getItem ('gameUserToken');
          const res=await axios.post(`${BACKENDURL}/game/players`,{token:token,gameCode:gameCode})
          if(res.data.playerStatus)navigate('/role')
          setPlayers(res.data.players)
          setKick(res.data.kick)
          setRoomName(res.data.RoomName)
          setCanKick(res.data.canKick)
          setPlayerSize(res.data.playerSize)
          setPlayerCount(res.data.playerCount)
        } catch (error) {
          setRoomErrorMsg(error.response.data.message)
          setRoomError(true)
          console.log(error)
        }
      }
      getPlayers()
    },[gameCode,navigate])
    
    const StartGame=async()=>{
      setStarting(true)
      try {
        let token = localStorage.getItem ('gameUserToken');
        const res=await axios.post(`${BACKENDURL}/game/start`,{token:token,gameCode:gameCode})
        console.log(res)
        setStarting(false)
        navigate('/role')
        socket.emit('start game',gameCode);
      } catch (error) {
        setStarting(false)
        setRoomErrorMsg(error.response.data.message)
        setTimeout(() => {
          setRoomErrorMsg('');
        }, 3000);
      }
    }
    const CloseGame=async()=>{
      setClosing(true)
      try {
        let token = localStorage.getItem ('gameUserToken');
        const res=await axios.post(`${BACKENDURL}/game/close`,{token:token,gameCode:gameCode})
        console.log(res)
        setClosing(false)
        navigate('/home')
        socket.emit('close game',gameCode);
      } catch (error) {
        setClosing(false)
        setRoomErrorMsg(error.response.data.message)
        setTimeout(() => {
          setRoomErrorMsg('');
        }, 3000);
      }
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
    <>{!roomError ?
      <div className={styles.cont}>
        <span className={styles.title}>{roomName}</span>
        <span className={styles.subtitle}>Player ({playerCount}/{playerSize})</span>
        <div className={styles.players}>
            {Players.map(l=><PlayerCard key={l._id} socket={socket} {...l}/>)}
        </div>
        <div className={styles.sharebox}>
          <span className={styles.gamecode} onClick={copyFun}>game code: {gameCode}</span>
          <div className={styles.info}>Copy & Share to friends<FaCopy color={isCopy?'green':"gray"} onClick={copyFun}/>{isCopy&&"Copied"}</div>
        </div>
        <button className={styles.closebtn} disabled={closing} onClick={CloseGame}>{closing?'Closing':"Delete game!"}</button>
        <button className={styles.startbtn} disabled={(playerCount!==playerSize)||kick!==canKick||starting} onClick={StartGame}>{starting?'Starting':"Start game!"}</button>
        <span className={styles.btninfo}>{roomErrorMsg?roomErrorMsg:'the game can be started by the room host now!'}</span>
    </div>
    :
    <div className={styles.errbox}>
      <div className={styles.errcont}>
      <span className={styles.errspan}>{roomErrorMsg}</span>
      <span className={styles.suberrspan}>you kick by the host or your token exipered</span>
      </div>
      <span className={styles.errbtn} onClick={()=>navigate('/home')}>Back to Home</span>
    </div>
  }
  </>
  )
}

export default Room