import { api } from '../axiosInstance';
import type { Word } from '../../domain/word';
import type { WordResponse } from './types';
import { mapWordListResponseToDomain } from '../../mapper/word';

export const getWordList = async (wordbookId: string): Promise<Word[]> => {
  const res = await api.get<WordResponse[]>(`/wordbook/${wordbookId}`);
  return mapWordListResponseToDomain(res.data);
};
