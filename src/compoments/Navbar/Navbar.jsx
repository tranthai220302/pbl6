import React, { useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import { useNavigate } from "react-router-dom";

export default function Navbar({setOpenChat}) {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  // const [openchat, setOpenchay] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('currentUser')) {
      navigate("/login");
    } else {
      setUser(
        JSON.parse(
          localStorage.getItem('currentUser')
        ) 
      );
    }
  }, []);
  console.log(user)
  return (
    <div className={styles.container}>
      {user ? (
        <div className={styles.user}>
          <div className={styles.avatar} onClick={()=>{setOpen(!open)}}>
            <img className={styles.img_avatar} src={user.avatar} alt="" />
            <span className={styles.name}>{user.lastName}</span>
          </div>
        </div>
      ):(
        <div>Login</div>
      )}
      {open && (
        <div className={styles.infor}>
          <span className={styles.item} onClick={()=>{setOpenChat(true)}}>Chat</span>
          <span className={styles.item}>Xem thông tin</span>
        </div>
      )}
    </div>
  )
}
