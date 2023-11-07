import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css'
import newRequest from '../../ults/NewRequest';
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
      navigate('/');
    },
  });
  const handleLogin = () => {
    mutation.mutate({ username, password });
  };
  return (
    <div className={styles.App}>
      <div className={styles.loginContainer}>
        <div className={styles.input_container}>
          <label>Username </label>
          <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className={styles.input_container}>
          <label>Password </label>
          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && (<div>{error}</div>)}
        {mutation.isPending && <div><img className={styles.img_loading} src=" https://assets.materialup.com/uploads/ec71c736-9c99-4c75-9fb4-6b263f9717a2/line.gif" alt="" /></div>}
        <button className={styles.loginBut} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
