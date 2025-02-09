import React, { useState, useEffect } from 'react';
import { getUsers } from '../../../services/ApiJSON';

const UserListPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then(data => setUsers(data))
      .catch(error => console.error('Ошибка при загрузке данных:', error));
  }, []);

  return (
    <div>
      <h1>Список пользователей</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserListPage;
