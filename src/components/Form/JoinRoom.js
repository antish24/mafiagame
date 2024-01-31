import React, {useEffect, useState} from 'react';
import styles from './joinroom.module.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {BACKENDURL} from '../../helper/Url';
import {Input, notification,Empty} from 'antd';
import GameCard from '../Cards/GameCard';

const JoinRoom = ({socket}) => {
  const [api, contextHolder] = notification.useNotification({});

  const openNotification = (msg) => {
    api.open({
      message: 'Error',
      description: msg,
      duration: 3,
      style: { border: '1px solid var(--color-error)',borderRadius:'10px'}
    });
  };

  const [roomCode, setRoomCode] = useState ();
  const [joining, setJoining] = useState (false);
  const navigate = useNavigate ();

  const { Search } = Input;

  const JoinFun = async() => {
    if (!window.confirm ('are you sure?')) return;
    setJoining (true);
    try {
      let token = localStorage.getItem ('gameUserToken');
      const res = await axios.post (`${BACKENDURL}/game/join`, {
        gameCode: roomCode,
        token: token,
      });
      socket.emit ('player join', roomCode);
      setJoining (false);
      navigate (`/room/${res.data.gameCode}`);
    } catch (error) {
      setJoining (false);
      openNotification(error.response.data.message)
    }
    setJoining (false);
  };

  const [games,setGames]=useState([{_id:1},{_id:4},{_id:3},{_id:2}])
  const [gameLoading,setGameLoading]=useState(true)

  useEffect(()=>{
    const getGames=async()=>{
      try {
        const res=await axios.get(`${BACKENDURL}/game/all`)
        setGameLoading(false)
        setGames(res.data.games)
      } catch (error) {
        openNotification(error.response.error.message)
      }
    }
    getGames()
  },[])

  return (
    <div className={styles.cont}>
      {contextHolder}
      <Search
      placeholder="game code"
      enterButton={<button disabled={joining}  className={styles.btn}>Join</button>}
      size='middle'
      disabled={joining}
      value={roomCode}
      onChange={e => setRoomCode (e.target.value)}
      onSearch={JoinFun}
    />
      <div className={styles.games}>
        <span className={styles.title}>Public Games</span>
        <div className={styles.list}>
          {games.length > 0 ?games.map((l,index)=><GameCard {...l} index={index + 1} loading={gameLoading} key={l._id} socket={socket}/>):<Empty/>}
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
