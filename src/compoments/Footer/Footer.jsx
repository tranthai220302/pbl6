import React from 'react'
import styles from './Footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartShopping, faBell, faSearch, faBook} from '@fortawesome/free-solid-svg-icons';



export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.footer}>
        <div className={styles.col}>
          <b>Hỗ trợ khách hàng</b>
          <ul>
            <li>Hotline: 1900 0000</li>
            <li>Các câu hỏi thường gặp</li>
            <li>Gửi yêu cầu hỗ trợ</li>
            <li>Hướng dẫn đặt hàng</li>
            <li>Phương thức vận chuyển</li>
            <li>Chính sách đổi trả</li>
            <li>Hướng dẫn trả góp</li>
            <li>Chính sách hàng nhập khẩu</li>
          </ul>
        </div>
        <div className={styles.col}>
          <b>Về chúng tôi</b>
          <ul>
            <li>Giới thiệu</li>
            <li>Tuyển dụng</li>
            <li>Chính sách bảo mật thanh toán</li>
            <li>Chính sách bảo mật thông tin</li>
            <li>Chính sách giải quyết khiếu nại</li>
            <li>Điều khoản sử dụng</li>
          </ul>
        </div>
        <div className={styles.col}>
          <b>Hợp tác và liên kết</b>
          <ul>
            <li>Quy chế hoạt động sàn GDTMĐT</li>
            <li>Bán cùng Harumi</li>
          </ul>
        </div>
        <div className={styles.col}>
          <b>Phương thức thanh toán</b>

        </div>
        <div className={styles.col}>
          <b>Kết nối với chúng tôi</b>
          
        </div>
      </div>
    </div>
  )
}
