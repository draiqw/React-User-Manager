import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } 
  catch (error) {
    console.error('Ошибка при получении пользователей:', error);
    throw error;
  }
};


export const loginUser = async (email, password) => {
  try {
    const response = await axios.get(`${API_URL}/users?email=${email}&password=${password}`);
    return response.data;
  } 
  catch (error) {
    console.error('Ошибка при выполнении запроса на логин:', error);
    throw error;
  }
};


export const registerUser = async (name, email, password) => {
  try {
    const checkResponse = await axios.get(`${API_URL}/users?email=${email}`);
    if (checkResponse.data.length > 0) {
      return { success: false, message: 'Пользователь с таким email уже существует.' };
    }

    const newUser = {name, email, password , "phone": ""};
    await axios.post(`${API_URL}/users`, newUser);

    return { success: true, message: 'Регистрация прошла успешно!' };
  } 
  catch (error) {
    console.error('Ошибка регистрации:', error);
    return { success: false, message: 'Ошибка регистрации.' };
  }
};

export const updateUser = async (id, updatedUserData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}`, updatedUserData);
    return response.data;
  } catch (error) {
    console.error('Ошибка обновления пользователя:', error);
    throw error;
  }
};