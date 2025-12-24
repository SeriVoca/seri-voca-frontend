import type { Wordbook } from '@/domain/wordbook';
import { mapWordbookList } from '@/mapper/wordbook';
import { api } from '@/apis/axiosInstance';

export const getWordbookList = async (): Promise<Wordbook[]> => {
  try {
    const res = await api.get('/wordbooks/default');
    return mapWordbookList(res.data);
  } catch (error) {
    console.error('[ERROR] 단어장 목록 조회 실패: ', error);
    throw error;
  }
};
