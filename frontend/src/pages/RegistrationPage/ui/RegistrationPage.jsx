import React, { useState } from 'react';
import { registerUser } from '../../../services/ApiJSON';
import './RegistrationPage.css';

const RegistrationForm = () => {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage]   = useState('');

  const handleRegistration = async (e) => {
    e.preventDefault();

    const result = await registerUser(name, email, password);
    setMessage(result.message);

    if (result.success) {
      // Можно сбросить поля формы при успешной регистрации
      setName('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <form onSubmit={handleRegistration}>
      <h2>Регистрация</h2>
      <div>
        <label>Имя:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Пароль:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Зарегистрироваться</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default RegistrationForm;
