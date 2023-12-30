import React, { useState } from 'react'
import styles from './Statistical.module.css'
import { Link } from 'react-router-dom';
import Chart from '../Chart/Chart'


export default function MyProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return(
        <div className={styles.MyProfile}>
            {
                currentUser ? (
                    <div>
                        <div className={styles.MyProfile_Title}>
                            Thống kê
                        </div>
                        <div className={styles.rating}>
                            <div>Đơn hàng : 15</div>
                            <div>Doanh thu : 10</div>
                            <div>Chiết khấu : 10</div>
                            <div>Số lượng đáng giá : 20</div>
                        </div>
                        <div>
                            <Chart/>
                        </div>
                        <div className={styles.MyProfile_Content}>
                        </div>
                    </div>
                ) : (
                    <div className={styles.notlogin}>
                        <span className={styles.Notification}>
                            Bạn cần đăng nhập để truy cập!
                        </span>
                        <Link to="/login">Đăng nhập</Link>
                    </div>
                )
            }
        </div>
    )
}