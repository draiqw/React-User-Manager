// src/components/Authentication.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/api';
import './Authentication.css';

const Authentication = () => {
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [message, setMessage]     = useState('');
  const navigate                  = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(email, password);
      if (data.length > 0) {

        setMessage('Вход выполнен успешно!');

        localStorage.setItem('user', JSON.stringify(data[0]));

        navigate('/');
      } else {
        setMessage('Неверные email или пароль.');
      }
    } catch (error) {
      console.error('Ошибка при входе:', error);
      
      setMessage('Ошибка при входе.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Вход</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Пароль:</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Войти</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Authentication;
