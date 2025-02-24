import axios from 'axios';

// const API_URL = 'http://localhost:8001/api';
const API_URL = 'http://212.41.9.231:8001/api';

export const getUsers = async (filters = {}) => {
  try {
    // filters: { query: '', role: '', workshop_id: '', page: 1, page_size: -1 }
    const response = await axios.get(`${API_URL}/users`, { params: filters });
    
    return response.data.values || [];
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error);
    throw error;
  }
};

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

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
    throw error;
  }
};
