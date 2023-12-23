import React, { useEffect, useState, useRef } from 'react';
import styles from './ChatContainer.module.css';
import axios from 'axios';
import Welcome from '../Welcome/Welcome';
import ChatInput from '../ChatInput/ChatInput';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import newRequest from '../../ults/NewRequest';
import { faL } from '@fortawesome/free-solid-svg-icons';
import uploadImg from '../../ults/upload';
export default function ChatContainer({ currentChat, userChat, setOpenChat, isChat, setIsChat }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const messageContainerRef = useRef(null);
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [size, setSize] = useState(false)
  useEffect(() => {
    if (!localStorage.getItem('currentUser')) {
      navigate("/login");
    } else {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      setUser(currentUser);
    }
  }, [navigate]);

  useEffect(() => {
    if (user) {
      const newSocket = io("http://localhost:8080");
      newSocket.emit("add-user", user.id);
      setSocket(newSocket);
    }
  }, [user]);
  const imagesUrl = async(file) =>{
    try {
      const url = await uploadImg(file); 
      return url;
    } catch (err) {
        console.log(err)
    }
  }
  const handleSendMsg =  async(message, img) => {
    if (currentChat && socket && userChat) {
      socket.emit("send-mes", {
        to: userChat.id,
        from: user.id,
        message: message,
        img : img
      });
      const updatedData = [...data, {
        ...(img && {img : img}),
        ...(message && {text : message}),
        UserId: user.id
      }];
      setData(updatedData);
      let file = '';
      if(img){
        file = await imagesUrl(img);
      }
      newRequest.post(`/message/create/${currentChat}`, { text: message, img : file }, {
        withCredentials: true
      }).then((res)=>{
        console.log('send messge successfully!')
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    if(currentChat){
      newRequest.get(`/message/${currentChat}`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
    }
  }, [currentChat]);
  useEffect(() => {
    console.log('thay doi userChat')
    if (socket && userChat) {
      console.log(userChat)
      console.log(userChat.id)
      socket.on("mes-receive", (msg) => {
        if(msg.from === userChat.id){
          if(msg.message && msg.img){
            setArrivalMessage({ text: msg.message, img: msg.img, UserId: userChat.id });
          }else if(msg.message.length > 0 && !msg.img){
            setArrivalMessage({ text: msg.message, UserId: userChat.id });
          }else if(!msg.message && msg.img){
            setArrivalMessage({ img: msg.img, UserId: userChat.id });
          }
        }else{
          setArrivalMessage(null)
        }
      });
    }
  }, [socket,userChat]);

  useEffect(() => {
    arrivalMessage && setData((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [data]);
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        {!userChat && (
          <div></div>
        )}
        {userChat && userChat.RoleId == 1 && (
          <div className={styles.userChat}>
            <img src={userChat.avatar} alt="avatar" className={styles.avatar_nav} />
            <span className={styles.username}>
              {userChat.firstName} {userChat.lastName}
            </span>
          </div>
        )}
        {userChat && userChat.RoleId == 2 && (
          <div className={styles.userChat}>
            <img src={userChat.DetailStore.avatar} alt="avatar" className={styles.avatar_nav} />
            <span className={styles.username}>
              {userChat.DetailStore.nameStore}
            </span>
          </div>
        )}
        <div className={styles.home_h}>
          {isChat ? (
              <img
                onClick={() => { setIsChat(false) }}
                className={styles.home}
                src="https://cdn.pixabay.com/photo/2013/07/12/15/37/close-150192_640.png"
                alt=""
              />
          ) : (
            <img
              onClick={() => { setOpenChat(false) }}
              className={styles.home}
              src="https://cdn.pixabay.com/photo/2013/07/12/15/37/close-150192_640.png"
              alt=""
            />
          )}
        </div>
      </div>
      {!userChat && (
        <Welcome />
      )}
      {loading && currentChat && (
        <img src="https://cdnb.artstation.com/p/assets/images/images/028/712/381/original/tim-gilardi-bunny-loading-animation3.gif?1595286299" alt="" className={styles.loading} />
      )}
      {
        !loading && data &&  (
          <div className={styles.chat_input}>
            <div className={size === false ? styles.chat : styles.chat1} ref={messageContainerRef}>
              {data.length > 0 && data.map((message, i) => {
                if (message.UserId === user.id) {
                  return (
                    <div key={i} className={styles.sender}>
                      <div className={styles.container_chat}>
                        {message.img && (
                          <img src={message?.img} alt="" className={styles.img_sender}/>
                        )}
                        {
                          message.text && (
                            <div className={styles.text_sender}>{message.text}</div>
                          )
                        }
                      </div>
                    </div>
                  );
                } else if (message.UserId !== user.id && !userChat.DetailStore) {
                  return (
                    <div key={i} className={styles.receive}>
                      <div className={styles.container_chat}>
                      {message.img &&(
                        <img src={message?.img} alt=""  className={styles.img_receive}/>
                      )}
                      {
                      message.text && (
                        <div className={styles.text_receive}>{message.text}</div>
                      )
                     }
                      </div>
                      <img src={userChat.avatar} alt="avatar" className={message.text ? (message.img ? styles.avatar1 : styles.avatar):styles.avatar} />
                    </div>
                  );
                } else if(message.UserId !== user.id && userChat.DetailStore) {
                  return (
                    <div key={i} className={styles.receive}>
                      <div className={styles.container_chat}>
                      {message.img &&(
                        <img src={message?.img} alt="" className={styles.img_receive}/>
                      )}
                        {
                        message.text && (
                          <div className={styles.text_receive}>{message.text}</div>
                        )
                      }
                      </div>
                      <img src={userChat.DetailStore.avatar} alt="avatar" className={message.text ? (message.img ? styles.avatar1 : styles.avatar):styles.avatar} />
                    </div>
                  );
                }
              })}
              {data.length == 0 && (
                <Welcome />
              )}
            </div>
            <ChatInput handleSendMsg={handleSendMsg} setSize={setSize}/>
          </div>
        )
      }
    </div>
  );
}
