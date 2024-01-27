import React, {useEffect, useState} from 'react';
import styles from './accountform.module.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {BACKENDURL} from '../../helper/Url';

const AccountForm = () => {
  const [userName, setUserName] = useState ('');
  const [userEmail, setUserEmail] = useState ('');
  const [userpic, setUserPic] = useState ('');
  const [password, setPassword] = useState ('');

  const navigate = useNavigate ();
  const [updateError, setUpdateError] = useState ('');
  const [logoutError, setLogoutError] = useState ('');
  const [islogout, setIsLogout] = useState (false);
  const [updating, setUpdating] = useState (false);
  const [editAccount, setEditAccount] = useState (false);

  const LogoutFun = async () => {
    setIsLogout (true);
    setLogoutError ('');
    if (window.confirm ('are you sure?')) {
      let token = localStorage.getItem ('gameUserToken');
      try {
        await axios.post (`${BACKENDURL}/user/logout`, {
          token: token,
        });
        setIsLogout (false);
        navigate ('/');
      } catch (error) {
        setLogoutError(error.response.data.message);
        setIsLogout (false);
      }
    }
    setIsLogout (false);
  };

  const updateFun = async (e) => {
    e.preventDefault()
    setUpdateError('')
    if (window.confirm ('are you sure?')) {
        setUpdating(true)
        let token = localStorage.getItem ('gameUserToken');
        try {
          const res=await axios.post (`${BACKENDURL}/user/update`, {
            token: token,userName:userName,email:userEmail,password:password
          });
          setUpdating (false);
          setUpdateError(res.data.message)
        } catch (error) {
          setUpdateError(error.response.data.message);
          setUpdating (false);
        }
      }
  };

  useEffect (() => {
    const getUserData = async () => {
      let token = localStorage.getItem ('gameUserToken');
      try {
        const res = await axios.get (`${BACKENDURL}/user/data?token=${token}`);
        setUserName (res.data.userData.name);
        setUserEmail (res.data.userData.email);
        setUserPic ('pic');
      } catch (error) {
        if(error){
            navigate('/')
        }
      }
    };
    getUserData ();
  }, [navigate,editAccount]);

  return (
    <div className={styles.cont}>
      {editAccount
        ?
        <form onSubmit={updateFun} className={styles.accountbox}>
            <img className={styles.picbox} src={userpic} alt='pic'/>
            <div className={styles.inputbox}>
                <span className={styles.lable}>UserName</span>
                <input className={styles.input} required value={userName} onChange={(e)=>setUserName(e.target.value)}/>
            </div>
            <div className={styles.inputbox}>
                <span className={styles.lable}>Email</span>
                <input className={styles.input} required value={userEmail} onChange={(e)=>setUserEmail(e.target.value)}/>
            </div>
            <div className={styles.inputbox}>
                <span className={styles.lable}>Password</span>
                <input className={styles.input} value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <span className={styles.updateerror}>{updateError}</span>
            <button className={styles.updatebtn} type='submit' disabled={updating}>Update</button>
            <button className={styles.cancelbtn} onClick={()=>setEditAccount(false)}>Cancel</button>
        </form>
        :
        <>
        <span className={styles.title}>My Account</span>
        <div className={styles.userbox}>
            <span className={styles.pic}></span>
            <div className={styles.userinfo}>
                <span className={styles.username}>{userName}</span>
                <span className={styles.userrole}>{userEmail}</span>
            </div>
            <span className={styles.editbtn} onClick={()=>setEditAccount(true)}>edit</span>
        </div>
        <div className={styles.statbox}></div>
        <button className={styles.logoutbtn} disabled={islogout} onClick={LogoutFun}>{islogout?"Lo....":"Logout"}</button>
        <span className={styles.logouterror}>{logoutError}</span>
        </>}
    </div>
  );
};

export default AccountForm;
