import React, { useEffect, useState } from 'react'
import styles from './NavbarAdmin.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from "react-router-dom";
import newRequest from '../../../ults/NewRequest';
import { faTrash, faPenToSquare, faCircleInfo,  faUser, faCartShopping, faBell, faSearch, faBook, faHouse} from '@fortawesome/free-solid-svg-icons';
function NavbarAdmin() {
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
              <div className={styles.search}>
                <input className={styles.input_search} type="text" placeholder='Tìm kiếm' />
                <button className={styles.btn_search}>
                  <FontAwesomeIcon icon={faSearch}/>
                </button>
              </div>
            </div>
            <div className={styles.right}>
              <ul className={styles.list_item}>
                <li className={styles.item}>
                  <Link to="/admin/home">
                    <FontAwesomeIcon icon={faHouse}/>
                  </Link>
                </li>
                <li className={styles.item}>
                  <Link>
                    <FontAwesomeIcon icon={faBell}/>
                  </Link>
                </li>
                <li className={`${styles.item } ${styles.account}`}>
                  <FontAwesomeIcon icon={faUser}/>
                  <div className={styles.acc_dropdown}>
                    {currentUser ? (
                      <>
                      <Link to='/profile'>Tài khoản của tôi</Link>
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
      {open && (
        <div className={styles.infor}>
          <span className={styles.item} >Chat</span>
          <span className={styles.item}>Xem thông tin</span>
        </div>
      )}
    </div>
  )
}

export default NavbarAdmin