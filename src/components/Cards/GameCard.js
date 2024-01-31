import React from 'react';
import {notification, Skeleton} from 'antd';
import styles from './gamecard.module.css';
import {FaUser} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {BACKENDURL} from '../../helper/Url';

const GameCard = ({loading, socket,index,...l}) => {
  const [api, contextHolder] = notification.useNotification ({});
  const navigate = useNavigate ();
  const openNotification = msg => {
    api.open ({
      message: 'Error',
      description: msg,
      duration: 3,
      style: {border: '1px solid var(--color-error)', borderRadius: '10px'},
    });
  };

  const JoinGame = async (e) => {
    if (window.confirm ('join game room ')) {
      try {
        let token = localStorage.getItem ('gameUserToken');
        const res = await axios.post (`${BACKENDURL}/game/select`, {
          gameCode: e,
          token: token,
        });
        socket.emit ('player join', e);
        navigate (`/room/${res.data.gameCode}`);
      } catch (error) {
        console.log(error)
        openNotification('Something went wrong')
      }
    }
  };
  return (
    <div className={styles.cont} onClick={() => JoinGame (l.gameCode)}>
      {contextHolder}
      <Skeleton loading={loading} active title={false} />
      {!loading &&
        <>
        <span className={styles.name}>{index}: {l.roomName}</span>
        <span className={styles.players}><FaUser color='var(--first-color)'/>{l.playerCount}</span>
        </>}
    </div>
  );
};

export default GameCard;
