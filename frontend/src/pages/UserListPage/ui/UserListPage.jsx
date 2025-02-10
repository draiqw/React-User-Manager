import React, { useState, useEffect } from 'react';
import { getUsers } from '../../../services/ApiJSON';
import './UserListPage.css';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(0);

  // Получаем данные пользователей при монтировании компонента
  useEffect(() => {
    getUsers()
      .then(data => setUsers(data))
      .catch(error => console.error('Ошибка при загрузке данных:', error));
  }, []);

  // Функция для расчёта количества карточек, которые помещаются на экране
  const computeVisibleCount = () => {
    // Определяем предполагаемые размеры карточки (с учётом gap и margin)
    const cardWidth = 300;  // px – приблизительная ширина карточки
    const cardHeight = 250; // px – приблизительная высота карточки
    const columns = Math.floor(window.innerWidth / cardWidth);
    const rows = Math.floor(window.innerHeight / cardHeight);
    const count = columns * rows;
    return count > 0 ? count : 1;
  };

  // Устанавливаем количество отображаемых карточек при загрузке и обновляем при изменении окна
  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(computeVisibleCount());
    };

    updateVisibleCount(); // начальный расчёт
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  // Фильтрация пользователей по поисковому запросу
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Выбираем только те карточки, которые должны отображаться (первые visibleCount)
  const displayedUsers = filteredUsers.slice(0, visibleCount);

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
        {displayedUsers.map(user => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserListPage;

