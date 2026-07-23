import type { Wordbook } from '@/domain/wordbook';
import { mapOrderedWordbookList, mapWordbook, mapWordbookList } from '@/mapper/wordbook';
import { api } from '@/apis/axiosInstance';

export const getWordbookList = async (): Promise<Wordbook[]> => {
  try {
    const res = await api.get('/curriculums/default');
    return mapOrderedWordbookList(res.data);
  } catch (error) {
    console.error('[ERROR] 단어장 목록 조회 실패: ', error);
    throw error;
  }
};

export const getUserWordbookList = async (): Promise<Wordbook[]> => {
  try {
    const res = await api.get('/wordbooks/user');
    return mapWordbookList(res.data);
  } catch (error) {
    console.error('[ERROR] 사용자 단어장 목록 조회 실패: ', error);
    throw error;
  }
};

export const createUserWordbook = async (
  title: string,
  description: string | null,
): Promise<Wordbook> => {
  try {
    const res = await api.post('/wordbooks', { title, description });
    return mapWordbook(res.data);
  } catch (error) {
    console.error('[ERROR] 사용자 단어장 생성 실패: ', error);
    throw error;
  }
};

export const deleteUserWordbook = async (wordbookId: string): Promise<void> => {
  try {
    await api.delete<void>(`/wordbooks/${wordbookId}`);
  } catch (error) {
    console.error('[ERROR] 사용자 단어장 삭제 실패: ', error);
    throw error;
  }
};
