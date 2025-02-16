import React, { useState } from 'react';
import { registerUser } from '../../../services/ApiJSON';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.css';

const RegistrationForm = () => {
  // Состояния для полей формы и сообщений об ошибках
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const validate = () => {

    let valid = true;

    const newErrors = { name: '', email: '', password: '' };

    if (name.trim() === '') {
      newErrors.name = 'Enter login';
      valid = false;
    }

    if (email.trim() === '') {
      newErrors.email = 'Enter email';
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        newErrors.email = 'Enter correct email';
        valid = false;
      }
    }

    if (password.trim() === '') {
      newErrors.password = 'Enter password';
      valid = false;
      
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const result = await registerUser(name, email, password);
    setMessage(result.message);

    if (result.success) {
      setName('');
      setEmail('');
      setPassword('');
      setErrors({ name: '', email: '', password: '' });
    }
  };

  return (
    <div className="body">
      <Form noValidate onSubmit={handleRegistration} className="registration-form">
        <h2 className="form-title">REGISTRATION</h2>

        <Form.Group controlId="formName" className="form-group">
          <Form.Control
            type="text"
            placeholder="login"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formEmail" className="form-group">
          <Form.Control
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!errors.email}
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
            SIGN UP
          </Button>
          <Button className="login-btn" onClick={() => navigate('/login')}>
            or login
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

export default RegistrationForm;
