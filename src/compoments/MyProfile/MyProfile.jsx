import React, { useState } from 'react'
import styles from './MyProfile.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faUser, faTableList, faTicket, faLink, faKey} from '@fortawesome/free-solid-svg-icons';

export default function MyProfile() {
    return(
        <div className={styles.MyProfile}>
            <div className={styles.MyProfile_Title}>
                Thông tin cá nhân
            </div>
            <div className={styles.MyProfile_Content}>
                <table>
                    <colgroup>
                        <col width='30%'/>
                        <col />
                    </colgroup>
                    <tr>
                        <th>Tên đăng nhập</th>
                        <td>khanhlinhne</td>
                    </tr>
                    <tr>
                        <th>Họ và tên</th>
                        <td>Trương Thị Khánh Linh</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>khanhlinhak20lqd@gmail.com</td>
                    </tr>
                    <tr>
                        <th>Số điện thoại</th>
                        <td>0384616499</td>
                    </tr>
                    <tr>
                        <th>Giới tính</th>
                        <td>Nữ</td>
                    </tr>
                    <tr>
                        <th>Ngày sinh</th>
                        <td>02/08/2002</td>
                    </tr>
                    <tr>
                        <th>Địa chỉ</th>
                        <td>K16/06 Ngô Sĩ Liên - Hòa Khánh - Liên Chiểu - Đà Nẵng</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}