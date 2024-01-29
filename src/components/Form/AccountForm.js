import React, {useEffect, useState} from 'react';
import styles from './accountform.module.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {BACKENDURL} from '../../helper/Url';
import SmallError from '../Errors/SmallError';
import { FaCrown, FaDice, FaEdit, FaUser } from 'react-icons/fa';
import { FaFaceFrown } from 'react-icons/fa6';

const AccountForm = ({socket}) => {
  const [userName, setUserName] = useState ('');
  const [userEmail, setUserEmail] = useState ('');
  const [userpic, setUserPic] = useState ('');
  const [password, setPassword] = useState ('');

  const navigate = useNavigate ();
  const [updateError, setUpdateError] = useState ('');
  const [updateErrorBg, setUpdateErrorBg] = useState ('red');
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
    setUpdateErrorBg('red')
    if (window.confirm ('are you sure?')) {
        setUpdating(true)
        let token = localStorage.getItem ('gameUserToken');
        try {
          const res=await axios.post (`${BACKENDURL}/user/update`, {
            token: token,userName:userName,email:userEmail,password:password
          });
          setUpdating (false);
          setUpdateErrorBg('green')
          setUpdateError(res.data.message)
          setTimeout(() => {
            setUpdateError('');
          }, 3000);
        } catch (error) {
          setUpdateError(error.response.data.message);
          setUpdating (false);
          setTimeout(() => {
            setUpdateError('');
          }, 3000);
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

  const SeleteGame=async(e)=>{
    if(window.confirm("join game room ")){
      try {
      let token = localStorage.getItem ('gameUserToken');
      const res=await axios.post(`${BACKENDURL}/game/select`,{gameCode:e,token:token})
      socket.emit('player join',e);
      navigate(`/room/${res.data.gameCode}`)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const [games,setGames]=useState([])

  useEffect(()=>{
    const getGames=async()=>{
      try {
        const res=await axios.get(`${BACKENDURL}/game/all`)
        console.log(res)
        setGames(res.data.games)
      } catch (error) {
        console.log(error)
      }
    }
    getGames()
  },[])

  return (
    <div className={styles.cont}>
      {editAccount
        ?
        <form onSubmit={updateFun} className={styles.accountbox}>
            {updateError && <SmallError text={updateError} color={'white'} bg={updateErrorBg}/>}
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
            {/* <span className={styles.updateerror}>{updateError}</span> */}
            <button className={styles.updatebtn} type='submit' disabled={updating}>{updating ?"Updating":"Update"}</button>
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
            <span className={styles.editbtn} onClick={()=>setEditAccount(true)}><FaEdit/></span>
        </div>
        <div className={styles.statbox} >
          <div className={styles.gameslist}>
            <span className={styles.gametitle}>Public Games</span>
            <div className={styles.gamelist}>
            {games && games.map((l,index)=>
          <div className={styles.gamecard} key={l._id} onClick={()=>SeleteGame(l.gameCode)}>
            <span className={styles.gamename}>{index + 1}: {l.roomName}</span>
            <span className={styles.gameplayer}><FaUser  color='rgb(0,140,255)'/>{l.playerCount}</span>
          </div>)}
            </div>
          </div>
          <div className={styles.mygame}>
          <span className={styles.gametitle}>My Stat</span>
          <span className={styles.mylist}><span>6</span><FaDice color='rgb(0,140,255)'/></span>
          <span className={styles.mywin}><span>2</span><FaCrown color='rgb(0,140,255)'/></span>
          <span className={styles.myloss}><span>4</span><FaFaceFrown color='rgb(0,140,255)'/></span>
          </div>
        </div>
        <button className={styles.logoutbtn} disabled={islogout} onClick={LogoutFun}>{islogout?"Lo....":"Logout"}</button>
        <span className={styles.logouterror}>{logoutError}</span>
        </>}
    </div>
  );
};

export default AccountForm;
