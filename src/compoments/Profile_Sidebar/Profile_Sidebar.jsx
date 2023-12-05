import React, { useState } from 'react'
import styles from './Profile_Sidebar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faUser, faTableList, faTicket, faLink, faKey} from '@fortawesome/free-solid-svg-icons';

export default function Profile_Sidebar({setOpen}) {
    const [isEditFormVisible, setEditFormVisibility] = useState(false);

    const handleEditClick = () => {
      setEditFormVisibility(true);
    };
    return (
        <div className={styles.Profile_Sidebar}>
            <div className={styles.profile_view_name}>
                <span className={styles.name}>Trương Thị Khánh Linh</span>
                <div className={styles.profile_edit} onClick={handleEditClick}>
                    <FontAwesomeIcon icon={faUserEdit}/>
                    <span>Sửa hồ sơ</span>
                </div>
            </div>
            <div className={styles.profile_view_content}>
                <ul>
                    <li onClick={() => { setOpen(1) }} >
                        <FontAwesomeIcon icon={faUser}/>
                        <span>Thông tin cá nhân</span>
                    </li>
                    <li onClick={()=>{setOpen(2)}}>
                        <FontAwesomeIcon icon={faKey}/>
                        <span >Đổi mật khẩu</span>
                    </li>
                    <li onClick={()=>{setOpen(3)}}>
                        <FontAwesomeIcon icon={faTableList}/>
                        <span>Đơn mua</span>
                    </li>
                    <li onClick={()=>{setOpen(4)}}>
                        <FontAwesomeIcon icon={faTicket}/>
                        <span >Voucher</span>
                    </li>
                    <li onClick={()=>{setOpen(5)}}>
                        <FontAwesomeIcon icon={faLink}/>
                        <span >Hợp tác với Harumi</span>
                    </li>
                </ul>
            </div>
            {/* Hiển thị form edit khi trạng thái là true */}
            {isEditFormVisible && (
                <div className={styles.overlay}>
                <div className={styles.editForm}>
                    <h3>Thay đổi thông tin cá nhân</h3>
                    <label htmlFor="">Tên đăng nhập: </label>
                    <input type="text" name="" id="" />
                    <label htmlFor="">Họ và tên: </label>
                    <input type="text" name="" id="" />
                    <label htmlFor="">Email: </label>
                    <input type="email" name="" id="" />
                    <label htmlFor="editName">Số điện thoại: </label>
                    <input type="text" id="" name="" />
                    <label htmlFor="">Giới tính: </label>
                    <input type="text" name="" id="" />
                    <label htmlFor="">Ngày sinh: </label>
                    <input type="date" name="" id="" />
                    <button>Lưu thay đổi</button>
                    <button className={styles.btn_cancel} onClick={() => setEditFormVisibility(false)}>Hủy bỏ</button>
                </div>
                </div>
            )}
        </div>
    )
}