import React, { useState } from 'react'
import styles from './HeaderStore.module.css'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import logo from '../../../assets/img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping, faBell, faSearch, faBook} from '@fortawesome/free-solid-svg-icons';

export default function HeaderStore() {
    const [isLoggedIn, setLoggedIn] = useState(true);
    const currentUser = localStorage.getItem("currentUser");
    const [userData, setUserData] = useState();
    const handleLogin = () => {
        setLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setUserData(null)
    };
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Link to="/store/home" className={styles.LogoBonus}>
                        <img className={styles.logo} src={logo} alt="logo" />
                        <span >Kênh người bán</span>
                    </Link>
                </div>
                <div className={styles.right}>
                    <ul className={styles.list_item}>
                        <li className={styles.item}>
                        <Link>
                            <FontAwesomeIcon icon={faBell}/>
                            Thông báo
                        </Link>
                        </li>
                        <li className={`${styles.item } ${styles.account}`}>
                        <FontAwesomeIcon icon={faUser}/>
                        Tên shop
                        <div className={styles.acc_dropdown}>
                        {currentUser ? (
                        <>
                        <Link to='/profile'>Hồ sơ Shop</Link>
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
        {/* )}
        {open && (
            <div className={styles.infor}>
            <span className={styles.item} onClick={()=>{setOpenChat(true)}}>Chat</span>
            <span className={styles.item}>Xem thông tin</span>
            </div>
        )} */}
        </div>
    )
}
