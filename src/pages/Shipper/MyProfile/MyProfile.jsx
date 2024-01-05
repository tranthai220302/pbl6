import React, { useState } from 'react';
import styles from './MyProfile.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

export default function MyProfile() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [openEdit, setOpenEdit] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  const updateProfile = async () => {
    try {
      const response = await axios.put(`/api/updateProfile/${currentUser.id}`, formData);
      console.log(response.data);
      toast.success('Thông tin đã được cập nhật thành công!');
      setOpenEdit(false);
    } catch (error) {
      console.error('Có lỗi khi cập nhật thông tin:', error.message);
      toast.error('Đã xảy ra lỗi khi cập nhật thông tin.');
    }
  };

  const EditStore = ({ setOpenedit }) => {
    const [formData, setFormData] = useState({
      name: '',
      logo: null,
      description: '',
      address: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    return (
      <div className={styles.overlay}>
        <div className={styles.editForm}>
          <h3>Thay đổi thông tin người giao hàng</h3>
          <label htmlFor="firstName">First Name: </label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder={currentUser.firstName} />
          <label htmlFor="lastName">Last Name: </label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder={currentUser.lastName} />
          <label htmlFor="email">Email: </label>
          <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder={currentUser.email} />
          <label htmlFor="phone">Số điện thoại: </label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder={currentUser.phone}/>
          <label htmlFor="address">Địa chỉ: </label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder={currentUser.address} />
          <button onClick={updateProfile} className={styles.button} >
            Lưu thay đổi
          </button>
          <button className={styles.btn_cancel} onClick={() => setOpenedit(false)}>
            Hủy bỏ
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.MyProfile}>
      {currentUser ? (
        <div>
          <div className={styles.MyProfile_Title}>
            <span>Thông tin cá nhân</span>
            <FontAwesomeIcon className={styles.Edit_StoreInf} icon={faPenSquare} onClick={() => setOpenEdit(true)} />
          </div>
          <div className={styles.MyProfile_Content}>
            <table>
              <colgroup>
                <col width='30%' />
                <col />
              </colgroup>
              <tr>
                <th>Tên đăng nhập</th>
                <td>{currentUser.username}</td>
              </tr>
              <tr>
                <th>Họ và tên</th>
                <td>{currentUser.firstName + ' ' + currentUser.lastName}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{currentUser.email}</td>
              </tr>
              <tr>
                <th>Số điện thoại</th>
                <td>{currentUser.phone}</td>
              </tr>
              <tr>
                <th>Địa chỉ</th>
                <td>{currentUser.address}</td>
              </tr>
            </table>
          </div>
        </div>
      ) : (
        <div className={styles.notlogin}>
          <span className={styles.Notification}>Bạn cần đăng nhập để truy cập!</span>
          <Link to="/login">Đăng nhập</Link>
        </div>
      )}
      {openEdit && <EditStore setOpenedit={setOpenEdit} />}
    </div>
  );
}
