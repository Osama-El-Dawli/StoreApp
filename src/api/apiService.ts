import axios from 'axios';
import { getTokens } from '../features/auth/storage/tokenStorage';

export const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async config => {
  const tokens = await getTokens();
  if (tokens?.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }
  return config;
});
