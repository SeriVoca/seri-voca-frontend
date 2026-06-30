import type { OrderedWordbookResponse, WordbookResponse } from '@/apis/wordbook/types';
import type { Wordbook } from '@/domain/wordbook';

// 평탄한 단어장 응답 → 도메인
export const mapWordbook = (res: WordbookResponse): Wordbook => {
  return {
    id: res.id,
    title: res.title,
    description: res.description ?? '',
    type: res.type,
  };
};

// order_index로 감싼 응답 → 도메인 (order_index는 정렬에만 쓰고 도메인에는 넣지 않음)
export const mapOrderedWordbook = (res: OrderedWordbookResponse): Wordbook => {
  return mapWordbook(res.wordbook);
};

export const mapWordbookList = (res: WordbookResponse[]): Wordbook[] => {
  return res.map(mapWordbook);
};

export const mapOrderedWordbookList = (res: OrderedWordbookResponse[]): Wordbook[] => {
  return res.map(mapOrderedWordbook);
};
