import React, { useState } from 'react';
import styles from './Profile_Sidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faUser, faTableList, faTicket, faLink, faKey } from '@fortawesome/free-solid-svg-icons';
import newRequest from '../../ults/NewRequest';

export default function Profile_Sidebar({ setOpen }) {
  const [isEditFormVisible, setEditFormVisibility] = useState(false);
  const handleEditClick = () => {
    setEditFormVisibility(true);
  };
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [formData, setFormData] = useState({
    username: currentUser.username,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    phone: currentUser.phone,
    address: currentUser.address,
    age: currentUser.age,
  });

  const UpdatUser = async (id) => {
    try {
    console.log(formData);
      const response = await newRequest.put(`/user/edit/${id}`, formData);
      setEditFormVisibility(false);
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className={styles.Profile_Sidebar}>
      <div className={styles.profile_view_name}>
        <span className={styles.name}>Trương Thị Khánh Linh</span>
        <div className={styles.profile_edit} onClick={handleEditClick}>
          <FontAwesomeIcon icon={faUserEdit} />
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
      {isEditFormVisible && (
        <div className={styles.overlay}>
          <div className={styles.editForm}>
            <h3>Thay đổi thông tin cá nhân</h3>
            <label htmlFor="username">Tên đăng nhập: </label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
            <label htmlFor="firstName">Họ: </label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            <label htmlFor="lastName">Tên: </label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            <label htmlFor="phone">Số điện thoại: </label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
            <label htmlFor="address">Địa chỉ: </label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
            <label htmlFor="age">Tuổi: </label>
            <input type="text" name="age" value={formData.age} onChange={handleChange} />
            <button onClick={() => UpdatUser(currentUser.id)}>Lưu thay đổi</button>
            <button className={styles.btn_cancel} onClick={() => setEditFormVisibility(false)}>Hủy bỏ</button>
          </div>
        </div>
      )}
    </div>
  );
}
