import React, {useEffect, useState} from 'react';
import styles from './vote.module.css';
import {Select} from 'antd';
import axios from 'axios';
import {BACKENDURL} from '../../helper/Url';
import VotePlayerCard from '../PlayerCard/VotePlayerCard';

const Vote = ({socket, players}) => {
  const [votedPlayer, setVotedPlayer] = useState ('');
  const [Players, setPlayers] = useState ([]);
  const [cantVote, setcantVote] = useState ();
  const [voting, setVoting] = useState (false);
  const handleChange = value => {
    setVotedPlayer (value);
  };

  const getPlayersData = async () => {
    try {
      let token = localStorage.getItem ('gameUserToken');
      let gameCode = localStorage.getItem ('playerGameCode');
      const res = await axios.post (`${BACKENDURL}/game/votes`, {
        token: token,
        gameCode: gameCode,
      });
          setPlayers(res.data.vote)
          setcantVote(res.data.canVote)
    } catch (error) {
      console.log (error);
    }
  };

  useEffect(()=>{
    const getPlayersData = async () => {
        try {
          let token = localStorage.getItem ('gameUserToken');
          let gameCode = localStorage.getItem ('playerGameCode');
          const res = await axios.post (`${BACKENDURL}/game/votes`, {
            token: token,
            gameCode: gameCode,
          });
          setcantVote(res.data.canVote)
          setPlayers(res.data.vote)
          console.log(res.data)
        } catch (error) {
          console.log (error);
        }
      };
      getPlayersData()
  },[])

  socket.on ('player voted', data => {
    console.log ('front message:', data);
    getPlayersData ();
  });


  const VoteFun = async () => {
    if (!window.confirm ('are you sure')) return;
    setVoting (true);
    try {
      let token = localStorage.getItem ('gameUserToken');
      let gameCode = localStorage.getItem ('playerGameCode');
      const res = await axios.post (`${BACKENDURL}/game/vote`, {
        token: token,
        gameCode: gameCode,
        player: votedPlayer,
      });
      socket.emit ('voting', 'player');
      setVoting (false);
      console.log (res);
    } catch (error) {
      setVoting (false);
      console.log (error);
    }
  };

  return (
    <div className={styles.cont}>
      <div className={styles.votebox}>
        <h1>VOTE NOW!</h1>
        {Players.map(l=><VotePlayerCard {...l} key={l._id}/>)}
      </div>
      <Select
        style={{
          width: '100%',
        }}
        onChange={handleChange}
      >
        {players.map (item => (
          <Select.Option value={item._id} key={item._id}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
      <button
        className={styles.btn}
        disabled={cantVote || voting || votedPlayer === ''}
        onClick={VoteFun}
      >
        {cantVote ?"Cant":"Vote"}
      </button>
    </div>
  );
};

export default Vote;
