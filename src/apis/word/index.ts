import { api } from '@/apis/axiosInstance';
import type { Word } from '@/domain/word';
import type { WordResponse } from '@/apis/word/types';
import {
  mapWordDomainToCreateRequest,
  mapWordListResponseToDomain,
  mapWordResponseToDomain,
  type CreateUserWordSource,
} from '@/mapper/word';

export const getWordList = async (wordbookId: string): Promise<Word[]> => {
  try {
    const res = await api.get<WordResponse[]>(`/wordbooks/${wordbookId}`);
    return mapWordListResponseToDomain(res.data);
  } catch (error) {
    console.error('[ERROR] 단어 목록 조회 실패', error);
    throw error;
  }
};

export const createUserWord = async (
  wordbookId: string,
  word: CreateUserWordSource,
): Promise<Word> => {
  try {
    const body = mapWordDomainToCreateRequest(word);
    const res = await api.post<WordResponse>(`/wordbooks/${wordbookId}/words/user`, body);
    return mapWordResponseToDomain(res.data);
  } catch (error) {
    console.error('[ERROR] 단어 생성 실패', error);
    throw error;
  }
};
