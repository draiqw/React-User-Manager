import React, { useState, useEffect } from 'react';
import { getUsers } from '../../../services/ApiJSON';
import './UserListPage.css';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getUsers()
      .then(data => setUsers(data))
      .catch(error => console.error('Error with loading data:', error));
  }, []);

  // Фильтрация пользователей по имени
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-list-page">
      <h1 className="page-title">Список пользователей</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="cards-container">
        {
          filteredUsers.map(
            user => (
              <div key={user.id} className="user-card">
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p> 
                <p>Phone: {user.phone}</p> 
              </div>
            )
          )
        }
      </div>
    </div>
  );
};

export default UserListPage;
