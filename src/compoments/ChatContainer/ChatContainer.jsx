import React, { useEffect, useState, useRef } from 'react';
import styles from './ChatContainer.module.css';
import axios from 'axios';
import Welcome from '../Welcome/Welcome';
import ChatInput from '../ChatInput/ChatInput';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

export default function ChatContainer({ currentChat, userChat, setOpen }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const messageContainerRef = useRef(null);
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);

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

  const handleSendMsg =  (message) => {
    if (currentChat && socket && userChat) {
      socket.emit("send-mes", {
        to: userChat.id,
        from: user.id,
        message: message
      });

      axios.post(`http://localhost:8080/api/message/create/${currentChat}`, { text: message }, {
        withCredentials: true
      }).then((res)=>{
        console.log('send messge successfully!')
      });

      const updatedData = [...data, { text: message, UserId: user.id }];
      setData(updatedData);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/message/${currentChat}`, {
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
  }, [currentChat]);

  useEffect(() => {
    if (socket && userChat) {
      socket.on("mes-receive", (msg) => {
        setArrivalMessage({ text: msg, UserId: userChat.id });
      });
    }
  }, [socket, userChat]);

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
        {userChat ? (
          <div className={styles.userChat}>
            <img src={userChat.avatar} alt="avatar" className={styles.avatar_nav} />
            <span className={styles.username}>
              {userChat.firstName} {userChat.lastName}
            </span>
          </div>
        ) : (
          <div></div>
        )}
        <div className={styles.home_h}>
          <img
            onClick={() => { setOpen(false) }}
            className={styles.home}
            src="https://cdn.pixabay.com/photo/2013/07/12/15/37/close-150192_640.png"
            alt=""
          />
        </div>
      </div>
      {!userChat && (
        <Welcome />
      )}
      {loading && currentChat && (
        <img src="https://cdnb.artstation.com/p/assets/images/images/028/712/381/original/tim-gilardi-bunny-loading-animation3.gif?1595286299" alt="" className={styles.loading} />
      )}
      {
        !loading && data && data.length > 0 && (
          <div className={styles.chat_input}>
            <div className={styles.chat} ref={messageContainerRef}>
              {data.map((message, i) => {
                if (message.UserId === user.id) {
                  return (
                    <div key={i} className={styles.sender}>
                      <div className={styles.text_sender}>{message.text}</div>
                      <img
                        src={user.avatar}
                        alt="avatar"
                        className={styles.avatar}
                      />
                    </div>
                  );
                } else if (message.UserId !== user.id) {
                  return (
                    <div key={i} className={styles.receive}>
                      <div className={styles.text_receive}>{message.text}</div>
                      <img src={userChat.avatar} alt="avatar" className={styles.avatar} />
                    </div>
                  );
                }
              })}
            </div>
            <ChatInput handleSendMsg={handleSendMsg} />
          </div>
        )
      }
    </div>
  );
}
