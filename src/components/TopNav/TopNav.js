import React, { useState } from 'react';
import styles from './topnav.module.css';
import {NavLink} from 'react-router-dom';
import {FaInfo} from 'react-icons/fa';

const TopNav = () => {
  const [showInfo,setShowInfo]=useState(false)
  return (
    <div className={styles.cont}>
      <NavLink to="/home">Mafia Game</NavLink>
      <div className={styles.infobox}>
        <FaInfo onClick={()=>setShowInfo(c=>!c)} />
        {showInfo && 
        <div className={styles.info}>
          <span>How to Play?</span>
          <p>step 1: need atleast 3 players<br/>
            step 2: leba is the imposter<br/>
            step 3: zapa is the normal 
          </p>
        </div>
        }
      </div>
    </div>
  );
};

export default TopNav;
