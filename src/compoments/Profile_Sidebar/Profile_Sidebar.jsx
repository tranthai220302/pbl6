import React, { useState } from 'react'
import styles from './Profile_Sidebar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faUser, faTableList, faTicket, faLink} from '@fortawesome/free-solid-svg-icons';

export default function Profile_Sidebar() {
    return (
        <div className={styles.Profile_Sidebar}>
            <div className={styles.profile_view_name}>
                <span>Trương Thị Khánh Linh</span>
                <div className={styles.profile_edit}>
                    <FontAwesomeIcon icon={faUserEdit}/>
                    <span>Sửa hồ sơ</span>
                </div>
            </div>
            <div className={styles.profile_view_content}>
                <ul>
                    <li>
                        <FontAwesomeIcon icon={faUser}/>
                        <span>Thông tin cá nhân</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faTableList}/>
                        <span>Đơn mua</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faTicket}/>
                        <span>Voucher</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faLink}/>
                        <span>Hợp tác với Harumi</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}