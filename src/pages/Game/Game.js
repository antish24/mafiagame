import React, { useEffect, useState } from 'react'
import styles from './game.module.css'
import GamePlayerCard from '../../components/PlayerCard/GamePlayerCard'
import axios from 'axios'
import { BACKENDURL } from '../../helper/Url'
import { useNavigate } from 'react-router-dom'
import Vote from '../../components/Vote/Vote'

const Game = ({socket}) => {
  const [Players,setPlayers]=useState([])
  const [PlayersReady,setPlayersReady]=useState([])
  const navigate=useNavigate()
  const [closing,setClosing]=useState(false)

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

  socket.on('player status', (data) => {
    // Handle the message event from the server
    console.log('Received message:', data);
    getPlayers()
    // ... handle the received message ...
  });

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

    const CloseGame=async()=>{
      if(!window.confirm('are you sure'))return
      setClosing(true)
      try {
      let gameCode = localStorage.getItem ('playerGameCode');
      let token = localStorage.getItem ('gameUserToken');
        const res=await axios.post(`${BACKENDURL}/game/close`,{token:token,gameCode:gameCode})
        console.log(res)
        setClosing(false)
        navigate('/home')
        socket.emit('close game',gameCode);
      } catch (error) {
        setClosing(false)
        alert(error.response.data.message)
      }
    }

  return (
    <div className={styles.cont}>
        <span className={styles.title}>{PlayersReady?"Players are Ready!":"Waiting for other players"}</span>
        <div className={styles.players}>
          {
            Players.map(l=><GamePlayerCard {...l} key={l._id}/>)
          }
          <button className={styles.closebtn} onClick={CloseGame} disabled={closing}>{closing?"Closing":"Close Game"}</button>
        </div>
        {PlayersReady&& <Vote socket={socket} players={Players}/>}
    </div>
  )
}

export default Game