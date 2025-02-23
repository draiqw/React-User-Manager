import React, { useState, useEffect } from 'react';
import { getUsers } from '../../../services/ApiJSON';
import './UserListPage.css';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  
  // Фильтры
  const [searchQuery, setSearchQuery] = useState('');       // Поиск по ФИО
  const [role, setRole] = useState('');                     // Фильтр по роли
  const [workshopId, setWorkshopId] = useState('');         // Фильтр по цеху

  // Параметры пагинации (дефолтные значения – первая страница, -1 для вывода всех)
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(-1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Функция для загрузки пользователей с учетом текущих фильтров
  const loadUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      // Собираем объект фильтров
      const filters = {
        query: searchQuery,
        role: role || undefined,
        workshop_id: workshopId || undefined,
        page: page,
        page_size: pageSize,
      };

      const data = await getUsers(filters);
      setUsers(data);
    } catch (err) {
      setError('Ошибка при загрузке данных');
    } finally {
      setLoading(false);
    }
  };

  // Загружаем пользователей при первом рендере и при изменении любого из фильтров
  useEffect(() => {
    loadUsers();
  }, [searchQuery, role, workshopId, page, pageSize]);

  // Формирование сообщений об отсутствии данных
  let message = '';
  if (!loading && users.length === 0) {
    // Если есть хотя бы один фильтр или строка поиска, выводим «Ничего не найдено»
    // Иначе – «Нет пользователей»
    message = (searchQuery || role || workshopId) ? 'Ничего не найдено' : 'Нет пользователей';
  }

  // Обработчики ввода для фильтров
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // При изменении запроса сбрасываем страницу на 1
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setPage(1);
  };

  const handleWorkshopChange = (e) => {
    setWorkshopId(e.target.value);
    setPage(1);
  };

  return (
    <div className="user-list-page">
      <h1 className="page-title">Список пользователей</h1>
      
      {/* Блок фильтров */}
      <div className="filters-container">
        <div className="filter-item">
          <label>Поиск по ФИО</label>
          <input
            type="text"
            placeholder="Введите ФИО"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div className="filter-item">
          <label>Роль</label>
          <input
            type="text"
            placeholder="Фильтр по роли"
            value={role}
            onChange={handleRoleChange}
          />
        </div>

        <div className="filter-item">
          <label>Цех (workshop_id)</label>
          <input
            type="number"
            placeholder="Фильтр по цеху"
            value={workshopId}
            onChange={handleWorkshopChange}
          />
        </div>
      </div>

      {/* Пагинация */}
      <div className="pagination-container">
        <label>Страница: </label>
        <input
          type="number"
          min="1"
          value={page}
          onChange={(e) => setPage(e.target.value ? parseInt(e.target.value, 10) : 1)}
          style={{ width: '60px' }}
        />

        <label>Количество на странице: </label>
        <input
          type="number"
          min="-1"
          max="100"
          value={pageSize}
          onChange={(e) => setPageSize(e.target.value ? parseInt(e.target.value, 10) : -1)}
          style={{ width: '60px' }}
        />
      </div>

      {/* Спиннер при загрузке */}
      {loading && (
        <div className="spinner-container">
          <div className="loader"></div>
          <p>Загрузка...</p>
        </div>
      )}

      {/* Блок ошибки */}
      {error && (
        <div className="message-container error-message">
          <div className="message-icon">!</div>
          <p className="message-text">{error}</p>
        </div>
      )}

      {/* Блок "нет данных" */}
      {!loading && message && (
        <div className="message-container no-data-message">
          <div className="message-icon">?</div>
          <p className="message-text">{message}</p>
        </div>
      )}

      {/* Список пользователей – показываем только если нет ошибки */}
      {!loading && !error && (
        <div className="cards-container">
          {users.map(user => (
            <div key={user.id} className="user-card">
              <h3>{user.fio}</h3>
              <p>Email: {user.email}</p>
              <p>Телефон: {user.phone}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserListPage;
