import React, { useEffect, useRef, useState } from 'react'
import styles from './Chat.module.css'
import ContactUser from '../../compoments/ContactUser/ContactUser'
import ChatContainer from '../../compoments/ChatContainer/ChatContainer'
import { io } from 'socket.io-client'
import { useNavigate } from "react-router-dom";
export default function Chat({setOpen}) {
  const [currentChat, setCurrentChat] = useState(null)
  const [userChat, setUserChat] = useState(null);
  const [currentUser, setCurrentUser] = useState(undefined);
  const socket = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('currentUser')) {
      navigate("/login");
    } else {
      setCurrentUser(
        JSON.parse(
          localStorage.getItem('currentUser')
        )
      );
    }
  }, []);
  const handleChat_UserChange = (chat, user) =>{
    setCurrentChat(chat)
    setUserChat(user)
  }
  // useEffect(()=>{
  //   if(currentUser){
  //     socket.current = io("http://localhost:8080");
  //     socket.current.emit("add-user", currentUser.id);
  //   }
  // },[currentUser])
  return (
    <div className={styles.container}>
        <ContactUser chatUserChange = {handleChat_UserChange}/>
        <ChatContainer currentChat = {currentChat} userChat = {userChat}  setOpen = {setOpen} />
    </div>
  )
}
