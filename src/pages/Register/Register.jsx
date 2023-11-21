import React from 'react'
import styles from './Register.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCartShopping, faBell, faSearch, faBook} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className={styles.register}>
      <div className={styles.form_register}>
        <span>Đăng ký tài khoản</span>
        <div className={styles.item}>
          <span>
            Họ và tên
          </span>
          <input type='text' placeholder="Nhập họ và tên"/>
        </div>
        <div className={styles.item}>
          <span>
            Email
          </span>
          <input type='email' placeholder="Nhập địa chỉ Email"/>
        </div>
        <div className={styles.item}>
          <span>
            Tên đăng nhập
          </span>
          <input type='text' placeholder="Nhập tên tài khoản"/>
        </div>
        <div className={styles.item}>
          <span>
            Mật khẩu
          </span>
          <input
            type="password"
            placeholder="Nhập mật khẩu"
          />
        </div>
        <div className={styles.btn}>
          <button>
            <span>Đăng ký</span>
          </button>
        </div>
        <div className={styles.btn}>
          <button>
            <FontAwesomeIcon icon={faEnvelope}/>
            <span>Đăng ký bằng email</span>
          </button>
        </div>
        <Link to='/'>
            <button className={styles.cancel}>
              <span>Hủy bỏ</span>
            </button>
        </Link>
      </div>
    </div>
  )
}
