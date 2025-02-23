import axios from 'axios';

// Базовый URL API
const API_URL = 'http://212.41.9.231:8001/api';

/**
 * Получение списка пользователей с фильтрацией и пагинацией.
 * Параметры (все query-параметры необязательны):
 * - query:    строка поиска по ФИО (string)
 * - role:     фильтр по роли (string)
 * - workshop_id: фильтр по цеху (integer)
 * - page:     номер страницы (integer, минимум 1)
 * - page_size: количество элементов на странице (integer, минимум -1, максимум 100)
 */
export const getUsers = async (filters = {}) => {
  try {
    // Пример filters: { query: '', role: '', workshop_id: '', page: 1, page_size: -1 }
    const response = await axios.get(`${API_URL}/users`, { params: filters });
    // Извлекаем массив пользователей из свойства "values" ответа
    return response.data.values || [];
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error);
    throw error;
  }
};


// Другие методы (аутентификация, регистрация, обновление, удаление) остаются без изменений...


// Аутентификация пользователя
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth`,
      { email, password },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    console.error('Ошибка при аутентификации пользователя:', error);
    throw error;
  }
};

// Регистрация нового пользователя
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при регистрации пользователя:', error);
    throw error;
  }
};

// Обновление данных пользователя
export const updateUser = async (id, updatedUserData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}`, updatedUserData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при обновлении данных пользователя:', error);
    throw error;
  }
};

// Удаление пользователя (если поддерживается API)
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
    throw error;
  }
};
