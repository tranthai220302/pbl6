import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css'
import newRequest from '../../ults/NewRequest';
import { Link } from 'react-router-dom';
import Register from '../Register/Register';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const mutation = useMutation({
    mutationFn: (newTodo) => newRequest.post('/auth/login', newTodo, {
    }).catch((error)=>{
      console.log(error)
      setError(error.response.data)
    }),
    onSuccess: (data, variables, context) => {
      localStorage.setItem('currentUser', JSON.stringify(data.data));
      if(data.data.RoleId == 1){
        navigate('/')
      }else if(data.data.RoleId == 4){
        navigate('/admin/customer')
      }
    },
  });
  const handleLogin = () => {
    mutation.mutate({ username, password });
  };
  return (
    <div className={styles.login}>
      <div className={styles.form_login}>
        <span>Đăng nhập</span>
        <div className={styles.item}>
          <span>
            Tên đăng nhập
          </span>
          <input
            type="text"
            name="username"
            id="username"
            value={username} // Thêm giá trị vào trường nhập liệu
            onChange={(e) => setUsername(e.target.value)} // Cập nhật giá trị vào state
            placeholder="Nhập tên tài khoản"
          />
        </div>
        <div className={styles.item}>
          <span>
            Mật khẩu
          </span>
          <input
            type="password"
            name="password"
            id="password"
            value={password} // Thêm giá trị vào trường nhập liệu
            onChange={(e) => setPassword(e.target.value)} // Cập nhật giá trị vào state
            placeholder="Nhập mật khẩu"
          />
          <i>
            <span>Quên mật khẩu?</span>
          </i>
        </div>
        <div className={styles.btn}>
          <button onClick={handleLogin}>
            <span>Đăng nhập</span>
          </button>
          <div>
            <i>Bạn chưa có tài khoản?</i>
            <Link to="/register">Đăng ký</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
