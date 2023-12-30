import React, { useState } from 'react';
import styles from './MyProfile.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default function MyProfile() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <div className={styles.MyProfile}>
      {currentUser ? (
        <div>
          <div className={styles.MyProfile_Title}>
            Thông tin cá nhân
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
                <th>Giới tính</th>
                <td>Nữ</td>
              </tr>
              <tr>
                <th>Ngày sinh</th>
                <td>02/08/2002</td>
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

  const updateVoucherItem = () => {
    console.log('Updating store information:', formData);
    setOpenedit(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.editForm}>
        <h3>Thay đổi thông tin người giao hàng</h3>
        <label htmlFor="name">Tên cửa hàng: </label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        <label htmlFor="name">Tên cửa hàng: </label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        <label htmlFor="name">Tên cửa hàng: </label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        <label htmlFor="name">Tên cửa hàng: </label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        <label htmlFor="name">Tên cửa hàng: </label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        {/* ... Other input fields ... */}
        <button onClick={updateVoucherItem} className={styles.button}>
          Lưu thay đổi
        </button>
        <button className={styles.btn_cancel} onClick={() => setOpenedit(false)}>
          Hủy bỏ
        </button>
      </div>
    </div>
  );
};
