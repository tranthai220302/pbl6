import React from 'react';
import styles from './Sidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faTableList } from '@fortawesome/free-solid-svg-icons';

export default function SideBar  ({ setSelect })  {  
  return (
      <div className={styles.Profile_Sidebar}>
        <div className={styles.profile_view_name}>
          <span className={styles.name}>Trương Thị Khánh Linh</span>
        </div>
        <div className={styles.profile_view_content}>
          <ul>
            <li onClick={() => setSelect(1)}>
              <FontAwesomeIcon icon={faUser} />
              <span>Thông tin cá nhân</span>
            </li>
            <li onClick={() => setSelect(2)}>
              <FontAwesomeIcon icon={faKey} />
              <span>Quản lý đơn hàng</span>
            </li>
            <li onClick={() => setSelect(3)}>
              <FontAwesomeIcon icon={faTableList} />
              <span>Thống kê</span>
            </li>
          </ul>
        </div>
      </div>
  )
}
