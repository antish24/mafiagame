import React, {useState} from 'react';
import styles from './rolecard.module.css';
import {GiWolfHead} from 'react-icons/gi';
import {LiaHatCowboySideSolid} from 'react-icons/lia';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { BACKENDURL } from '../../helper/Url'

const RoleCard = ({character}) => {
  const [showFront, setshowFront] = useState (true);
  
  const navigate=useNavigate()

  const continueGame=async()=>{
    try {
        let gameCode = localStorage.getItem ('playerGameCode');
        let token = localStorage.getItem ('gameUserToken');
      const res=await axios.post(`${BACKENDURL}/game/ready`,{token:token,gameCode:gameCode})
      console.log(res)
      navigate('/game')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className={styles.cont}>
      {showFront
        ? <div className={styles.front} onClick={() => setshowFront (c => !c)}>
            <span className={styles.topicon}><GiWolfHead /></span>
            <div className={styles.info}>
              <span className={styles.title}>Game</span>
              <span className={styles.sub}>Click to reveal your role</span>
            </div>
            <span className={styles.bottomicon}><LiaHatCowboySideSolid /></span>
          </div>
        :
        <div className={styles.back}>
            <span className={styles.title}>{character}</span>
            <span className={styles.des}>role description role description ole descr
            iption role description role description role description role descr
            iption role  description 
            </span>
            <button className={styles.contbtn} onClick={continueGame}>Continue</button>
        </div>}
    </div>
  );
};

export default RoleCard;
