import React, { useState } from 'react'
import styles from './createroom.module.css'
import { FaUser } from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import {BACKENDURL} from '../../helper/Url';

const CreateRoom = () => {

    const [roomName,setRoomName]=useState()
    const [playerSize,setPlayerSize]=useState(3)
    const [createing,setCreateing]=useState(false)
    const [createError,setCreateError]=useState('')

    const navigate=useNavigate()

    const CreateRoomFun=async(e)=>{
        e.preventDefault()
        if(!window.confirm('are you sure?'))return
        setCreateing(true)
        setCreateError('')
        try {
            let token = localStorage.getItem ('gameUserToken');
            const res=await axios.post(`${BACKENDURL}/game/create`,{roomName:roomName,playerSize:playerSize,token:token})
            console.log(res)
            setCreateing(false)
            navigate(`/room/${res.data.gameCode}`)
        } catch (error) {
            setCreateing(false)
            setCreateError(error.response.data.message)
            console.log(error)
        }
    }
  return (
    <form onSubmit={CreateRoomFun} className={styles.cont}>
        <span className={styles.title}>Create game room</span>
        <div className={styles.inputbox}>
            <span className={styles.lable}>Room name</span>
            <input placeholder='myfist game' required value={roomName} onChange={(e)=>setRoomName(e.target.value)} type='text' name='gamename' className={styles.input}/>
        </div>
        <div className={styles.inputbox}>
            <span className={styles.lable}>Player limit - {playerSize}</span>
            <FaUser/>
            <input type='range' required min={3} max={10} value={playerSize} onChange={(e)=>setPlayerSize(e.target.value)} className={styles.range}/>
        </div>
        <button type='submit' disabled={createing}>{createing?"Joining":'Create Room'}</button>
        <span className={styles.errorbox}>{createError}</span>
    </form>
  )
}

export default CreateRoom