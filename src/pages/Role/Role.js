import React, { useEffect, useState } from 'react'
import styles from './role.module.css'
import RoleCard from '../../components/RoleCard/RoleCard'
import axios from 'axios'
import { BACKENDURL } from '../../helper/Url'
import {useNavigate} from 'react-router-dom'

const Role = () => {
  const [player,setPlayer]=useState()
  const navigate=useNavigate()

  useEffect(()=>{
    const getRole=async()=>{
      try {
        let token = localStorage.getItem ('gameUserToken');
        let gameCode = localStorage.getItem ('playerGameCode');
        const res=await axios.post(`${BACKENDURL}/game/role`,{token:token,gameCode:gameCode})
        console.log(res)
        setPlayer(res.data.player.character)
      } catch (error) {
        console.log(error)
        navigate('/home')
      }
    }
    getRole()
  },[navigate])
  return (
    <div className={styles.cont}>
        <span className={styles.title}>Your role</span>
        <RoleCard character={player}/>
    </div>
  )
}

export default Role