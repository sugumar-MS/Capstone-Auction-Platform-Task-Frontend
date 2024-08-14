import axios from 'axios';

const API_URL = 'https://capstone-auction-platform-backend-task-1.onrender.com/api';

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/users/register`, userData);
};

export const loginUser = async (userData) => {
  return await axios.post(`${API_URL}/users/login`, userData);
};

export const getProducts = async () => {
  return await axios.get(`${API_URL}/products`);
};
