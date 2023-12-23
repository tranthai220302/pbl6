import React, { useEffect, useState } from 'react'
import styles from './Header.module.css'
import { useNavigate } from "react-router-dom";
import logo from '../../assets/img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping, faBell, faSearch, faBook, faHouse} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import newRequest from '../../ults/NewRequest';
export default function Header({setOpenChat}) {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState();
  // const [openchat, setOpenchay] = useState(false);
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentUser")
  
  
  const handleLogout = () => {
    newRequest.post(`/auth/logout`, {
      withCredentials: true
    })
    .then((res) => {
      localStorage.removeItem('currentUser');
      console.log(res.data)
      setUserData(null);
      navigate('/')
    })
    .catch((error) => {
      console.log(error)
    });
  };

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
              <Link to="/">
                <img className={styles.logo} src={logo} alt="logo" />
              </Link>
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
                  <Link to="/">
                    <FontAwesomeIcon icon={faHouse}/>
                    Trang chủ
                  </Link>
                </li>
                <li className={styles.item}>
                  <Link to="/booklist">
                    <FontAwesomeIcon icon={faBook}/>
                    Danh mục
                  </Link>
                </li>
                <li className={styles.item}>
                  <Link>
                    <FontAwesomeIcon icon={faBell}/>
                    Thông báo
                  </Link>
                </li>
                <li className={styles.item}>
                  <Link to='/cart'>
                    <FontAwesomeIcon icon={faCartShopping}/>
                    Giỏ hàng
                  </Link>
                </li>
                <li className={`${styles.item } ${styles.account}`}>
                  <FontAwesomeIcon icon={faUser}/>
                  Tài khoản
                  <div className={styles.acc_dropdown}>
                    {currentUser ? (
                      <>
                      <Link to='/profile'>Tài khoản của tôi</Link>
                      <div onClick={()=>setOpenChat(true)}>Chat</div>
                      <Link>Đơn mua</Link>
                      <Link onClick={handleLogout}>Đăng xuất</Link>
                      </>
                    ) : (
                      <>
                        <Link to="/login">Đăng nhập</Link>
                        <Link to="/register">Đăng ký</Link>
                      </>
                    )}
                  </div>
                </li>
              </ul>
            </div>
        </div>
      )}
      {/* {open && (
        <div className={styles.infor}>
          <span className={styles.item} onClick={()=>{setOpenChat(true)}}>Chat</span>
          <span className={styles.item}>Xem thông tin</span>
        </div>
      )} */}
    </div>
  )
}
