import axios from 'axios';
import { authTokenStore } from '../store/authTokenStore';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

if (!SUPABASE_URL) {
  throw new Error('VITE_SUPABASE_URL 환경 변수가 설정되지 않았습니다.');
}

export const api = axios.create({
  baseURL: SUPABASE_URL + '/functions/v1/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = authTokenStore.get();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
