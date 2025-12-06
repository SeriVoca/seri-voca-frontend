import { api } from './axiosInstance';

export const getWordbookList = async () => {
  const res = await api.get('/wordbooks/default');
  return res.data;
};
