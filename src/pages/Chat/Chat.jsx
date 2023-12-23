import React, { useEffect, useRef, useState } from 'react'
import styles from './Chat.module.css'
import ContactUser from '../../compoments/ContactUser/ContactUser'
import ChatContainer from '../../compoments/ChatContainer/ChatContainer'
import { useNavigate } from "react-router-dom";
import { useMemo } from 'react';
import newRequest from '../../ults/NewRequest';
  export default function Chat({isChat, setIsChat, idUser}) {
    const [currentChat, setCurrentChat] = useState(null)
    const [userChat, setUserChat] = useState(null);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [openChat, setOpenChat] = useState(false)
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
    useEffect(()=>{
      if(idUser && currentUser){
        newRequest.post('/chat/create', {
          to : idUser.id
        }, {
          withCredentials : true
        }).then((res)=>{
          handleChat_UserChange(res.data.chat.id, idUser)
        }).catch((error)=>{
          console.log(error.response.data);
        })
      }
    },[idUser])
    if(!isChat){
      return (
        <div>
          {
            openChat ? (
              <div className={styles.container}>
                <ContactUser chatUserChange = {handleChat_UserChange}/>
                <ChatContainer currentChat = {currentChat} userChat = {userChat}  setOpenChat = {setOpenChat} />
              </div>
            ) : (
              <div className={styles.chat} onClick={()=>{setOpenChat(true)}}>
                <img src="https://cdn-icons-png.flaticon.com/512/2950/2950568.png" alt="Chat" className={styles.chat_img}/>
              </div>
            )
          }
        </div>
      )
    }else{
      // handleChat_UserChange(currentChat.id, idUser)
      return (
        <div className={styles.container}>
          <ContactUser chatUserChange = {handleChat_UserChange}/>
          <ChatContainer currentChat = {currentChat} userChat = {userChat}  setOpenChat = {setOpenChat} isChat = {isChat} setIsChat={setIsChat}/>
        </div>
      )
    }
}
