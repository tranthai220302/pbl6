
import styles from './ContactUser.module.css'
import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
import logo from '../../assets/img/Rectangle 4 (1).png'
import React, { useEffect, useState } from 'react'
import newRequest from '../../ults/NewRequest'
export default function ContactUser({chatUserChange}) {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [data, setData] = useState([]);
    const getData = ()=>{
        setIsPending(true);
        newRequest.get(`/chat`, {
        }).then(
          (res) => {
            setData(res.data)
            setIsPending(false);
            setError(false)
            console.log(res.data)
          }
        ).catch((error)=>{
          setError(error.response.data)
          setIsPending(false)
        })
      }
    useEffect(()=>{
        getData()
    },[])
    const user = JSON.parse(localStorage.getItem('currentUser'))
    return (
        <div className={styles.contactUser}>
            <div className={styles.logo}>
                <span className={styles.name_logo}>Chat</span>
                <img src="https://img.freepik.com/premium-vector/comic-speech-bubble-chat-message-element-quote-text-doodle-speech-bubble-hand-drawn-cloud-shape_502320-868.jpg?w=2000" alt="" className={styles.img_logo} />
            </div>
            <div className={styles.container}>
                {isPending && (
                    <img 
                        className={styles.avatar}
                        src="https://cdn.dribbble.com/users/32512/screenshots/3545667/loaader_circle_by_gleb.gif"
                        alt="Avatar" 
                    />
                )}
                {error && (
                    <div>{error.message}</div>
                )}
                {data && data.length > 0 && data.map((chat, i)=>{
                    if(chat.Participant1.id !== user.id){
                        return (
                            <div className={styles.user} key={i} onClick={()=>{chatUserChange(chat.id, chat.Participant1)}}>
                                <img 
                                    className={styles.avatar}
                                    src= {chat.Participant1.avatar}
                                    alt="Avatar" 
                                />
                                <div className={styles.infor}>
                                    <span className={styles.username}>{chat.Participant1.firstName} {chat.Participant1.lastName}</span>
                                    <span className={styles.lastMessage}>{chat.lastMessage}</span>
                                </div>
                            </div>
                        )
                    }else{
                        return (
                            <div className={styles.user} key={i} onClick={()=>{chatUserChange(chat.id, chat.Participant2)}}>
                                <img 
                                    className={styles.avatar}
                                    src= {chat.Participant2.DetailStore.avatar}
                                    alt="Avatar" 
                                />
                                <div className={styles.infor}>
                                    <span className={styles.username}>{chat.Participant2.DetailStore.nameStore}</span>
                                    <span className={styles.lastMessage}>{chat.lastMessage}</span>
                                </div>
                            </div>
                        )
                    }                   
                })}
            </div>
        </div>
    )
}
