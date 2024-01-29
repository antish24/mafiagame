import React from 'react';
import styles from './playercard.module.css';
import { IoIosRemoveCircle } from "react-icons/io";
import { FaGhost } from "react-icons/fa6";
import axios from 'axios';
import {BACKENDURL} from '../../helper/Url';

const PlayerCard = ({socket,...l}) => {
  const KickPlayer=async()=>{
    if(window.confirm(`u sure to kick${l.userName}`)){
      try {
        const res=await axios.post(`${BACKENDURL}/game/kick`,{id:l._id})
        socket.emit('player kicked','player');
        alert(res.data.message)
      } catch (error) {
        alert(error.respones.data.message)
      }
    }
  }

  return (
    <div className={styles.cont}>
      <div className={styles.pic}></div>
      <div className={styles.userinfo}>
        <span className={styles.name}>{l.userName}</span>
        <span className={styles.role}>{l.role}</span>
      </div>
      {l.role==='host'&&<div className={styles.host}><FaGhost/></div>}
      {(l.kick===l.canKick&&l.role!=='host')&&<div className={styles.action}><IoIosRemoveCircle onClick={KickPlayer}/></div>}

    </div>
  );
};

export default PlayerCard;
