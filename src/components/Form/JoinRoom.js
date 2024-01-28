import React, { useState } from 'react'
import styles from './createroom.module.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import {BACKENDURL} from '../../helper/Url';

const JoinRoom = () => {
  const [roomCode,setRoomCode]=useState()
  const [joining,setJoining]=useState(false)
  const [JoinError,setJoinError]=useState('')
  const navigate=useNavigate()

  const JoinFun=async(e)=>{
    e.preventDefault()
    if(!window.confirm('are you sure?'))return
    setJoining(true)
    try {
      let token = localStorage.getItem ('gameUserToken');
      const res=await axios.post(`${BACKENDURL}/game/join`,{gameCode:roomCode,token:token})
      console.log(res)
      setJoining(false)
      navigate(`/room/${res.data.gameCode}`)
  } catch (error) {
      setJoining(false)
      setJoinError(error.response.data.message)
      setTimeout(() => {
        setJoinError('');
      }, 3000);
      console.log(error)
  }
    setJoining(false)
  }
  return (
    <form  onSubmit={JoinFun} className={styles.cont}>
        <span className={styles.title}>Join game room</span>
        <div className={styles.inputbox}>
            <span className={styles.lable}>Room code</span>
            <input placeholder='#gbiu367' required value={roomCode} onChange={(e)=>setRoomCode(e.target.value)} type='text' name='code' className={styles.input}/>
        </div>
        <span style={{color:'red'}}>{JoinError}</span>
        <button type='submit' disabled={joining}>{joining?"Joning":"Join Room"}</button>
    </form>
  )
}

export default JoinRoom