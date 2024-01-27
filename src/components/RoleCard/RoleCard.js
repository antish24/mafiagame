import React, {useState} from 'react';
import styles from './rolecard.module.css';
import {GiWolfHead} from 'react-icons/gi';
import {LiaHatCowboySideSolid} from 'react-icons/lia';
import {useNavigate} from 'react-router-dom'

const RoleCard = () => {
  const [showFront, setshowFront] = useState (true);
  
  const navigate=useNavigate()

  const continueGame=()=>{
    navigate('/game')
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
            <span className={styles.title}>Police</span>
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
