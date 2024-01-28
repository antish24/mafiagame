import React, { useEffect, useRef, useState } from 'react'
import styles from './chat.module.css'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import CommentCard from '../CommentCard/CommentCard'
import axios from 'axios';
import {BACKENDURL} from '../../helper/Url';

const Chat = () => {
    const [openChat,setOpenChat]=useState(false)
    const [sendChat,setSendChat]=useState(false)
    const [msgValue,setMsgValue]=useState('')
    const chatListRef=useRef(null)

    const [chatErr,setChatErr]=useState()
    const [chats,setChats]=useState([])

    const sendMsg=async(e)=>{
      e.preventDefault()
      setSendChat(true)
      try {
        let token = localStorage.getItem ('gameUserToken');
        const res=await axios.post(`${BACKENDURL}/chat/post`,{msg:msgValue,token:token,gameCode:localStorage.getItem('playerGameCode')})
        console.log(res)
        setChatErr('.....')
        setMsgValue('')
        setTimeout(() => {
          setChatErr('');
        }, 3000);
        
        setSendChat(false)
      } catch (error) {
        console.log(error)
        setChatErr(error.response.data.message)
        setTimeout(() => {
          setChatErr('');
        }, 3000);
        setSendChat(false)
      }
      if (chatListRef.current) {
        chatListRef.current.scrollTop =('-100%');
      }
    }

    useEffect (() => {
      const getUserData = async () => {
        let token = localStorage.getItem ('gameUserToken');
        try {
          const res = await axios.get (`${BACKENDURL}/chat/chats?token=${token}&&gameCode=${localStorage.getItem('playerGameCode')}`);
          setChats(res.data.chats)
        } catch (error) {
          setChatErr(error.response.data.message)
        }
      };
      getUserData ();
    }, [sendChat,openChat]);

  return (
    <div className={styles.cont} style={{height:openChat?"400px":'30px'}}>
        <div className={styles.nav} onClick={()=>setOpenChat(c=>!c)}>
            <span className={styles.title}>Chat
              {openChat?"":<span className={styles.notification}>2</span>}
            </span>
            <span>{openChat?<FaArrowDown/>:<FaArrowUp/>}</span>
        </div>
        <div className={styles.chats} ref={chatListRef}>
          {chatErr && <span style={{color:'red',textAlign:'center'}}>{chatErr}</span>}
          {chats.map(l=><CommentCard key={l._id} {...l}/>)}
        </div>
        <form className={styles.msgbox} onSubmit={sendMsg}>
            <input required maxLength={160} value={msgValue} onChange={(e)=>setMsgValue(e.target.value)} placeholder='Message'/>
            <button type='submit' hidden disabled={sendChat}></button>
        </form>
    </div>
  )
}

export default Chat