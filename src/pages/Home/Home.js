import React, {useState} from 'react';
import styles from './Home.module.css';
import CreateRoom from '../../components/Form/CreateRoom';
import JoinRoom from '../../components/Form/JoinRoom';
import AccountForm from '../../components/Form/AccountForm';

const Home = ({socket}) => {
  const [activeTab, setActiveTab] = useState (2);
  const Tab = [{id: 1, name: 'Create room'}, {id: 2, name: 'Join room'}];

  return (
    <div className={styles.cont}>
      <div className={styles.tabcont}>
        {Tab.map (l => (
          <div
            className={styles.tab}
            key={l.id}
            style={{
              color: activeTab === l.id ? 'white' : 'rgb(0,140,255)',
              background: activeTab === l.id ? 'rgb(0,140,255)' : 'white',
            }}
            onClick={() => setActiveTab (l.id)}
          >
            {l.name}
          </div>
        ))}
      </div>
      {activeTab===1 ? <CreateRoom/>: <JoinRoom socket={socket}/>}
      <AccountForm/>
    </div>
  );
};

export default Home;
