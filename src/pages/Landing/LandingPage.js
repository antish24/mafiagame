import React, {useState} from 'react';
import styles from './landingpage.module.css';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {BACKENDURL} from '../../helper/Url'
import SmallError from '../../components/Errors/SmallError';

const LandingPage = () => {
  const [email, setEmail] = useState ();
  const [password, setPassword] = useState ();
  const [userName, setUserName] = useState ();
  const navigate=useNavigate()

  const [hasAccount, setHasAccount] = useState (false);
  const [loading, setLoading] = useState (false);
  const [pageError, setPageError] = useState ('');
  const [pageErrorColor, setPageErrorColor] = useState ('red');

  const LoginFun = async e => {
    e.preventDefault ();
    setLoading(true)
    setPageError('')
    setPageErrorColor('red')
    try {
      const res=await axios.post(`${BACKENDURL}/user/login`,{email:email,password:password})
      localStorage.setItem('gameUserToken',res.data.token)
      setLoading(false)
      navigate('/home')
    } catch (error) {
      setLoading(false)
      setPageError(error.response.data.message)
    }
  };

  const RegisterFun = async e => {
    e.preventDefault ();
    setLoading(true)
    setPageErrorColor('red')
    setPageError('')
    try {
      const res=await axios.post(`${BACKENDURL}/user/register`,{userName:userName,email:email,password:password})
      setPageErrorColor('green')
      setLoading(false)
      setPageError(res.data.message)
      setHasAccount(true)
    } catch (error) {
      setLoading(false)
      setPageError(error.response.data.message)
    }
  };

  return (
    <div className={styles.cont}>
      <form
        className={styles.loginform}
        onSubmit={hasAccount ? LoginFun : RegisterFun}
      >
        <span className={styles.title}>{hasAccount?"Login":"Create new Account"}</span>
        {!hasAccount &&
          <div className={styles.inputcont}>
            <span className={styles.lable}>Username</span>
            <input
              className={styles.input}
              required
              maxLength={30}
              value={userName}
              onChange={e => setUserName (e.target.value)}
              type="text"
            />
          </div>}
        <div className={styles.inputcont}>
          <span className={styles.lable}>Email</span>
          <input
            className={styles.input}
            required
            maxLength={30}
            value={email}
            onChange={e => setEmail (e.target.value)}
            type="email"
          />
        </div>
        <div className={styles.inputcont}>
          <span className={styles.lable}>Password</span>
          <input
            className={styles.input}
            required
            maxLength={30}
            value={password}
            onChange={e => setPassword (e.target.value)}
            type="password"
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
        {/* {pageError && <span className={styles.errortext} style={{background:pageErrorColor}}>{pageError}</span>} */}
        {pageError && <SmallError color={'white'} bg={pageErrorColor} text={pageError}/>}
      </form>
    </div>
  );
};

export default LandingPage;
