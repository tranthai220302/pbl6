import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import newRequest from '../../ults/NewRequest';
import styles from './Register.module.css';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      console.log(formData);
      const response = await newRequest.post(`/auth/register`,  formData);
    } catch (error) {
      console.error('Error registering user:', error);
      alert(error)
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.form_register}>
        <span>Đăng ký tài khoản</span>
        <div className={styles.item}>
          <span>Họ</span>
          <input type="text" name="firstName" placeholder="Nhập họ" onChange={handleChange} />
        </div>
        <div className={styles.item}>
          <span>Tên</span>
          <input type="text" name="lastName" placeholder="Nhập tên" onChange={handleChange} />
        </div>
        <div className={styles.item}>
          <span>Email</span>
          <input type="email" name="email" placeholder="Nhập địa chỉ Email" onChange={handleChange} />
        </div>
        <div className={styles.item}>
          <span>Tên đăng nhập</span>
          <input type="text" name="username" placeholder="Nhập tên tài khoản" onChange={handleChange} />
        </div>
        <div className={styles.item}>
          <span>Mật khẩu</span>
          <input type="password" name="password" placeholder="Nhập mật khẩu" onChange={handleChange} />
        </div>
        <div className={styles.item}>
          <span>Xác nhận mật khẩu</span>
          <input type="password" name="confirmPassword" placeholder="Nhập mật khẩu" onChange={handleChange} />
        </div>
        <div className={styles.btn}>
          <button onClick={handleSubmit}>
            <span>Đăng ký</span>
          </button>
        </div>
        <div className={styles.btn}>
          <button >
            <FontAwesomeIcon icon={faEnvelope} />
            <span>Đăng ký bằng email</span>
          </button>
        </div>
        <Link to="/">
          <button className={styles.cancel}>
            <span>Hủy bỏ</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
