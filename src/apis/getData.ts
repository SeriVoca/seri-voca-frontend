import { api } from './axiosInstance';
import type { getWordbookListResponse } from './types';

export const getWordbookList = async (): Promise<getWordbookListResponse> => {
  const res = await api.get('/wordbooks/default');
  return res.data;
};
