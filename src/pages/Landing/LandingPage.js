import React, {useEffect, useState} from 'react';
import styles from './landingpage.module.css';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {BACKENDURL} from '../../helper/Url'
import {Input, notification} from 'antd';

const LandingPage = () => {
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const [userName, setUserName] = useState ('');
  const navigate=useNavigate()
  const [passwordVisible, setPasswordVisible] = useState (false);

  const [hasAccount, setHasAccount] = useState (false);
  const [loading, setLoading] = useState (false);

  const [api, contextHolder] = notification.useNotification({});

  const openNotification = (title,msg,color) => {
    api.open({
      message: title,
      description: msg,
      duration: 3,
      style: { border: `1px solid ${color}`,borderRadius:'10px'}
    });
  };

  const LoginFun = async e => {
    e.preventDefault ();
    setLoading(true)
    try {
      const res=await axios.post(`${BACKENDURL}/user/login`,{email:email,password:password})
      localStorage.setItem('gameUserToken',res.data.token)
      setLoading(false)
      navigate('/home')
    } catch (error) {
      setLoading(false)
      openNotification('Error',error.response.data.message,'var(--color-error)')
    }
  };

  const RegisterFun = async e => {
    e.preventDefault ();
    setLoading(true)
    try {
      const res=await axios.post(`${BACKENDURL}/user/register`,{userName:userName,email:email,password:password})
      setLoading(false)
      openNotification('Success',res.data.message,'var(--color-success)')
      setHasAccount(true)
    } catch (error) {
      setLoading(false)
      openNotification('Error',error.response.data.message,'var(--color-error)')
    }
  };


  useEffect (() => {
    const getUserData = async () => {
      let token = localStorage.getItem ('gameUserToken');
      try {
        await axios.get (`${BACKENDURL}/user/data?token=${token}`);
        navigate('/home')
      } catch (error) {
        navigate('/')
      }
    };
    getUserData ();
  }, [navigate]);


  return (
    <div className={styles.cont}>
      {contextHolder}
      <form
        className={styles.loginform}
        onSubmit={hasAccount ? LoginFun : RegisterFun}
      >
        <span className={styles.title}>{hasAccount?"Login":"Create new Account"}</span>
        {!hasAccount &&
          <div className={styles.inputcont}>
            <span className={styles.lable}>Username</span>
            <Input
            placeholder="someone"
            status={userName.length < 6 && "error"}
            required
            maxLength={30}
            value={userName}
            onChange={e => setUserName (e.target.value)}
          />
          </div>}
        <div className={styles.inputcont}>
          <span className={styles.lable}>Email</span>
          <Input
            placeholder="some@gmail.com"
            status={!(email.includes('@')&& email.includes('.')) &&"error"}
            required
            type='email'
            maxLength={30}
            value={email}
            onChange={e => setEmail (e.target.value)}
          />
        </div>
        <div className={styles.inputcont}>
          <span className={styles.lable}>Password</span>
          <Input.Password
            placeholder="input password"
            status={password.length < 6 && "error"}
            required
            maxLength={30}
            value={password}
            onChange={e => setPassword (e.target.value)}
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange: setPasswordVisible,
            }}
          />
        </div>
        {hasAccount
          ? <span onClick={() => setHasAccount (false)}>
              don't have an account ?
            </span>
          : <span onClick={() => setHasAccount (true)}>
              Already have an account ?
            </span>}
        <button type="submit" disabled={loading} className={styles.loginbtn}>
          {hasAccount ? loading?"L...":'Login' : loading?"R...":'Register'}
        </button>
      </form>
    </div>
  );
};

export default LandingPage;
