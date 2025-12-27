import { api } from '@/apis/axiosInstance';
import type { Word } from '@/domain/word';
import type { WordResponse } from '@/apis/word/types';
import { mapWordListResponseToDomain } from '@/mapper/word';

export const getWordList = async (wordbookId: string): Promise<Word[]> => {
  try {
    const res = await api.get<WordResponse[]>(`/wordbook/${wordbookId}`);
    return mapWordListResponseToDomain(res.data);
  } catch (error) {
    console.error('[ERROR] 단어 목록 조회 실패', error);
    throw error;
  }
};
