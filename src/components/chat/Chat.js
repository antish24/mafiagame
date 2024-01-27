import React, { useRef, useState } from 'react'
import styles from './chat.module.css'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import CommentCard from '../CommentCard/CommentCard'

const Chat = () => {
    const [openChat,setOpenChat]=useState(false)
    const [msgValue,setMsgValue]=useState('')
    const chatListRef=useRef(null)

    const [chats,setChats]=useState([
      {id:1,name:'smaimab',time:'today 2:44 pm',msg:"my name is anteneh ,this is the biograph of me i have mid exam out of 15 and 30 compiler design and computer security"},
      {id:2,name:'nfffati',time:'today 2:54 pm',msg:"out of 15 and 30 compiler design and computer security"},
      {id:3,name:'abitabit',time:'today 2:58 pm',msg:"is is the biograph of me i have mid exam out of 15 and 30 compiler design and computer security"},
      {id:4,name:'ish5454',time:'today 3:44 pm',msg:" of me i have mid exam out of 15 and 30 compiler design and computer security"},
    ])

    const sendMsg=async(e)=>{
      e.preventDefault()
      setMsgValue('')
      const newChat = {
        id: chats.length + 1,
        name: "chla",
        time: new Date().toLocaleString(),
        msg: msgValue
      };

      setChats([newChat,...chats]);

      if (chatListRef.current) {
        chatListRef.current.scrollTop =('-100%');
      }
    }

  return (
    <div className={styles.cont} style={{height:openChat?"400px":'30px'}}>
        <div className={styles.nav} onClick={()=>setOpenChat(c=>!c)}>
            <span className={styles.title}>Chat
              {openChat?"":<span className={styles.notification}>2</span>}
            </span>
            <span>{openChat?<FaArrowDown/>:<FaArrowUp/>}</span>
        </div>
        <div className={styles.chats} ref={chatListRef}>
            {chats.map(l=><CommentCard key={l.id} {...l}/>)}
        </div>
        <form className={styles.msgbox} onSubmit={sendMsg}>
            <input required maxLength={160} value={msgValue} onChange={(e)=>setMsgValue(e.target.value)} placeholder='Message'/>
            <button type='submit' hidden></button>
        </form>
    </div>
  )
}

export default Chat