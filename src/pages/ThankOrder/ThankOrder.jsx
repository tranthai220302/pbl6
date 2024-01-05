// ThankOrder.js
import React from 'react';
import styles from './ThankOrder.module.css';
 // Thay đổi đường dẫn hình ảnh tùy thuộc vào vị trí của bạn
import { Link } from 'react-router-dom';
const ThankOrder = () => {
  return (
    <div className={styles.container}>
      <img src="https://i.pinimg.com/originals/41/e7/4b/41e74b0f91b7cb7df6b73e34ae8528a4.gif" alt="" className={styles.img_fire}/>
      <div className={styles.thankMessage}>
        <h1>Đặt hàng thành công!</h1>
        <img src='https://media2.giphy.com/media/fG79gO7oMLJ9M1UXGJ/giphy.gif?cid=6c09b952wk52xsjlhskcm837mqepqakjmvlhqz45jbq21qv6&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s' alt="Thank You" className={styles.thankImage} />
        <p>Chúng tôi đã nhận được đơn đặt hàng của bạn.</p>
        <p>Đơn hàng của bạn sẽ được xử lý trong thời gian sớm nhất.</p>
        <p>
        </p>
      </div>
    </div>
  );
};

export default ThankOrder;
