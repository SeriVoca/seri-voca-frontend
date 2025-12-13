import { api } from './axiosInstance';
import type { getWordbookListResponse } from './types';

export const getWordbookList = async (): Promise<getWordbookListResponse> => {
  try {
    const res = await api.get('/wordbooks/default');
    return res.data;
  } catch (error) {
    console.error('[ERROR] 단어장 목록 조회 실패: ', error);
    throw error;
  }
};
