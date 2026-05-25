import axios from 'axios';
import { useAuthStore } from '../store/auth.store';

export const apiClient = axios.create({
  baseURL: process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const jwt = useAuthStore.getState().jwt;
  if (jwt) config.headers.Authorization = `Bearer ${jwt}`;
  return config;
});
