import React, { useEffect, useState } from 'react'
import styles from './Header.module.css'
import { useNavigate } from "react-router-dom";
import logo from '../../assets/img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping, faBell, faSearch, faBook} from '@fortawesome/free-solid-svg-icons';

export default function Header({setOpenChat}) {
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
        <div className={styles.header}>
            <div className={styles.left}>
              <img className={styles.logo} src={logo} alt="logo" />
              <div className={styles.search}>
                <input className={styles.input_search} type="text" placeholder='Tìm kiếm sản phẩm' />
                <button className={styles.btn_search}>
                  <FontAwesomeIcon icon={faSearch}/>
                </button>
              </div>
            </div>
            <div className={styles.right}>
              <ul className={styles.list_item}>
                <li className={styles.item}>
                  <FontAwesomeIcon icon={faBook}/>
                  Danh mục
                </li>
                <li className={styles.item}>
                  <FontAwesomeIcon icon={faBell}/>
                  Thông báo
                </li>
                <li className={styles.item}>
                  <FontAwesomeIcon icon={faCartShopping}/>
                  Giỏ hàng
                </li>
                <li className={styles.item}>
                  <FontAwesomeIcon icon={faUser}/>
                  Tài khoản
                </li>
              </ul>
            </div>
        </div>
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
