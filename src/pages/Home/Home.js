import React from 'react';
import styles from './Home.module.css';
import CreateRoom from '../../components/Form/CreateRoom';
import JoinRoom from '../../components/Form/JoinRoom';
import {Tabs} from 'antd';

const Home = ({socket}) => {
  const Tab = [
    {id: 1, name: 'Create room', content: <CreateRoom />},
    {id: 2, name: 'Join room', content: <JoinRoom socket={socket} />},
  ];

  return (
    <div className={styles.cont}>
      <Tabs
        type="card"
        items={Tab.map (l => {
          return {
            label: l.name,
            key: l.id,
            children: l.content,
          };
        })}
      />
    </div>
  );
};

export default Home;
