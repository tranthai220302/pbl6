import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (newTodo) => axios.post('http://localhost:8080/api/auth/login', newTodo, {
      withCredentials: true
    }),
    onSuccess: (data, variables, context) => {
      localStorage.setItem('currentUser', JSON.stringify(data.data));
      navigate('/chat');
    },
  });
  const handleLogin = () => {
    mutation.mutate({ username, password });
  };
  return (
    <div>
      {mutation.isPending && <div>Login loading...</div>}
      
      {mutation.isError && <div>{mutation.isError.message}</div>}

      <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Ok</button>
    </div>
  );
}
