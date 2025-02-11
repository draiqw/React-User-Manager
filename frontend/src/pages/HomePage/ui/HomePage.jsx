import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { updateUser } from '../../../services/ApiJSON';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ id: null, name: '', email: '', phone: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user.id) {
      setMessage('User ID not found. Please log in again.');
      return;
    }
    try {
      const updatedUser = await updateUser(user.id, user);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating profile. Please try again later.');
    }
  };

  return (
    <div className="home-body">
      <Form noValidate onSubmit={handleUpdate} className="profile-form">
        <h3 className="profile-title">Edit Profile</h3>
        
        <Form.Group controlId="formName" className="form-group">
          <Form.Control
            type="text"
            placeholder="Name"
            value={user.name}
            readOnly
          />
        </Form.Group>
        
        <Form.Group controlId="formEmail" className="form-group">
          <Form.Control
            type="email"
            placeholder="Email"
            value={user.email}
            readOnly
          />
        </Form.Group>
        
        <Form.Group controlId="formPhone" className="form-group">
          <Form.Control
            type="text"
            name="phone"
            placeholder="Enter phone"
            value={user.phone}
            onChange={handleChange}
          />
        </Form.Group>
        
        <Button type="submit" className="update-btn">
          Update Profile
        </Button>
        
        {message && (
          <Alert variant="info" className="mt-3 text-center custom-alert">
            {message}
          </Alert>
        )}
      </Form>

      {/* Кнопка для перехода на страницу всех пользователей */}
      <Button 
        type="button" 
        className="view-users-btn"
        onClick={() => navigate('/users')}
      >
        View All Users
      </Button>
    </div>
  );
};

export default HomePage;
