import React from 'react';
import styles from './topnav.module.css';
import {NavLink,useNavigate} from 'react-router-dom';
import {FaChessPawn} from 'react-icons/fa6';
import {Dropdown, Space,notification} from 'antd';

import axios from 'axios';
import {BACKENDURL} from '../../helper/Url';

const TopNav = () => {
  const navigate=useNavigate()
  
  const Logout=async()=>{
    try {
      await axios.post(`${BACKENDURL}/user/logout`,{token:localStorage.getItem('gameUserToken')})
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }  

  const items = [
    {
      label: <NavLink to='/account'>Account</NavLink>,
      key: '0',
    },
    {
      label: "How to play",
      key: '2',
    },
    {
      label: "Guide",
      key: '3',
    },
    {
      type: 'divider',
    },
    {
      label: <span onClick={Logout}>Logout</span>,
      key: '4',
    },
  ];

  return (
    <div className={styles.cont}>
      <NavLink to="/home" className={styles.logo}><span>Mo</span><span>rancho</span></NavLink>
      <Dropdown menu={{items,}} placement='bottomRight'>
          <Space>
            <FaChessPawn className={styles.links}/>
          </Space>
      </Dropdown>
    </div>
  );
};

export default TopNav;
