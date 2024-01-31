import React, {useEffect, useRef, useState} from 'react';
import styles from './accountform.module.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {BACKENDURL} from '../../helper/Url';
import {FaEdit} from 'react-icons/fa';
import {Input, notification} from 'antd';

const AccountForm = ({socket}) => {
  const [userName, setUserName] = useState ('');
  const [userEmail, setUserEmail] = useState ('');
  const [userpic, setUserPic] = useState ('');
  const [password, setPassword] = useState ('');
  const picRef=useRef(null)

  const navigate = useNavigate ();
  const [updating, setUpdating] = useState (false);

  const selectPic=()=>{
    picRef.current.click()
  }
  const handlePicChange=(e)=>{
    const file=e.target.files[0]
    setUserPic(URL.createObjectURL(file))
  }

  const [api, contextHolder] = notification.useNotification({});

  const openNotification = (title,msg,color) => {
    api.open({
      message: title,
      description: msg,
      duration: 3,
      style: { border: `1px solid ${color}`,borderRadius:'10px'}
    });
  };

  const updateFun = async e => {
    e.preventDefault ();
    if (window.confirm ('are you sure?')) {
      setUpdating (true);
      let token = localStorage.getItem ('gameUserToken');
      try {
        const res = await axios.post (`${BACKENDURL}/user/update`, {
          token: token,
          userName: userName,
          email: userEmail,
          password: password,
        });
        openNotification('Success',res.data.message,'var(--color-success)')
        setUpdating (false);
      } catch (error) {
        setUpdating (false);
        openNotification('Error',error.response.error.message,'var(--color-error)')
      }
    }
  };

  useEffect (
    () => {
      const getUserData = async () => {
        let token = localStorage.getItem ('gameUserToken');
        try {
          const res = await axios.get (
            `${BACKENDURL}/user/data?token=${token}`
          );
          setUserName (res.data.userData.name);
          setUserEmail (res.data.userData.email);
          setUserPic ('pic');
        } catch (error) {
          if (error) {
            navigate('/')
          }
        }
      };
      getUserData ();
    },
    [navigate]
  );

  const [passwordVisible, setPasswordVisible] = useState (false);
  return (
    <div className={styles.cont}>
      {contextHolder}
      <span className={styles.title}>My account</span>
      <form onSubmit={updateFun} className={styles.accountform}>
        <div className={styles.picbox}>
          <img src={userpic} alt='pic' className={styles.zpic}/>
          <input type='file' ref={picRef} onChange={handlePicChange} style={{ display: 'none' }}/>
          <span onClick={selectPic}><FaEdit/></span>
        </div>
        <div className={styles.infobox}>
          <span>UserName</span>
          <Input
            status={(userName.length < 6)&&"error"}
            value={userName}
            onChange={e => setUserName (e.target.value)}
          />
        </div>
        <div className={styles.infobox}>
          <span>Email</span>
          <Input
            value={userEmail}
            type='email'
            status={!(userEmail.includes('@') && userEmail.includes('.'))&&"error"}
            onChange={e => setUserEmail (e.target.value)}
          />
        </div>
        <div className={styles.infobox}>
          <span>Password</span>
          <Input.Password
            placeholder="input password"
            status={(password.length ===0)?"":password.length< 6&& "error"}
            value={password}
            onChange={e => setPassword (e.target.value)}
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange: setPasswordVisible,
            }}
          />
        </div>
        <button className={styles.btn} disabled={updating} type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default AccountForm;
