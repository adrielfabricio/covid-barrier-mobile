import axios from 'axios';
import { store } from '../store';

export const url_api = 'http://localhost:8000/v1/api';

const api = axios.create({
  baseURL: url_api,
  timeout: 30000,
});

api.interceptors.request.use(async (config) => {
  const token = store.getState().user.auth.token;
  if (token && config.url !== '/auth/login') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
