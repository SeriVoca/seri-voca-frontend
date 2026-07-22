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

// export const addSystemWordToUserWordbook = async (
//   wordbookId: string,
//   systemWordId: string,
// ): Promise<Word> => {
//   try {
//     const res = await api.post<WordResponse>(`/wordbooks/${wordbookId}/words/system`, {
//       systemWordId: systemWordId,
//     });
//     return mapWordResponseToDomain(res.data);
//   } catch (error) {
//     console.error('[ERROR] 단어 추가 실패', error);
//     throw error;
//   }
// };

export const addSystemWordListToUserWordbook = async (
  wordbookId: string,
  systemWordIds: string[],
): Promise<Word[]> => {
  try {
    const res = await api.post<WordResponse[]>(`/wordbooks/${wordbookId}/words/system/bulk`, {
      systemWordIds: systemWordIds,
    });
    return mapWordListResponseToDomain(res.data);
  } catch (error) {
    console.error('[ERROR] 단어 일괄 추가 실패', error);
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

// export const deleteUserWord = async (wordbookId: string, wordId: string): Promise<void> => {
//   const body = { wordId };
//   try {
//     const res = await api.delete<void>(`/wordbooks/${wordbookId}/words/user`, {
//       data: body,
//     });
//   } catch (error) {
//     console.error('[ERROR] 단어 삭제 실패', error);
//     throw error;
//   }
// };

export const deleteUserWordList = async (
  wordbookId: string,
  wordIds: string[],
): Promise<{ wordIds: string[] }> => {
  const body = { wordIds };
  try {
    const res = await api.delete<{ wordIds: string[] }>(
      `/wordbooks/${wordbookId}/words/user/bulk`,
      {
        data: body,
      },
    );
    return res.data;
  } catch (error) {
    console.error('[ERROR] 단어 일괄 삭제 실패', error);
    throw error;
  }
};
