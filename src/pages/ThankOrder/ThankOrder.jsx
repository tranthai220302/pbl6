// ThankOrder.js
import React from 'react';
import styles from './ThankOrder.module.css';
 // Thay đổi đường dẫn hình ảnh tùy thuộc vào vị trí của bạn
import { Link } from 'react-router-dom';
const ThankOrder = () => {
  return (
    <div className={styles.container}>
      <div className={styles.thankMessage}>
        <h1>Đặt hàng thành công!</h1>
        <p>Chúng tôi đã nhận được đơn đặt hàng của bạn.</p>
        <p>Đơn hàng của bạn sẽ được xử lý trong thời gian sớm nhất.</p>
        <p>
        </p>
      </div>
    </div>
  );
};

export default ThankOrder;
