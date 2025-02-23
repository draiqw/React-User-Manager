import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../services/ApiJSON';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    let valid = true;
    
    const newErrors = { email: '', password: '' };
    
    if (email.trim() === '') {
      newErrors.email = 'Enter email';
      valid = false;
    }
    
    if (password.trim() === '') {
      newErrors.password = 'Enter password';
      valid = false;
    }
    
    setErrors(newErrors);
    
    if (!valid) return;

    try {
      const data = await loginUser(email, password);
      if (data.length > 0) {
        localStorage.setItem('user', JSON.stringify(data[0]));
        
        // setTimeout(() => {
        //   navigate('/');
        // }, 3000);

        navigate('/home');
      } else {
        setMessage('Wrong email or password.');
      }
    } catch (error) {
      console.error('Error with login. Try again later.', error);
      setMessage('Error with login. Try again later.');
    }
  };

  return (
    <div className="body">
      {/* Отключаем стандартную валидацию браузера */}
      <Form noValidate onSubmit={handleLogin} className="login-form">
        <h2 className="form-title">AUTHENTICATION</h2>
        <Form.Group controlId="formEmail" className="form-group">
          <Form.Control
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!errors.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPassword" className="form-group">
          <Form.Control
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={!!errors.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="button-group">
          <Button className="Hidden">
            or login
          </Button>
          <Button type="submit" className="register-btn">
            LOGIN
          </Button>
          <Button className="login-btn" onClick={() => navigate('/register')}>
            or register
          </Button>
        </div>

        {message && (
          <Alert variant="info" className="mt-3 text-center custom-alert">
            {message}
          </Alert>
        )}
      </Form>
    </div>
  );
};

export default LoginPage;

