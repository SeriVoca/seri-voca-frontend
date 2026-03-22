import type { GetWordbookListResponse } from '@/apis/wordbook/types';
import type { Wordbook } from '@/domain/wordbook';

type WordbookResponseItem = GetWordbookListResponse[number];

export const mapWordbook = (item: WordbookResponseItem): Wordbook => {
  return {
    id: item.wordbook.id,
    title: item.wordbook.title,
    description: item.wordbook.description ?? '',
    type: item.wordbook.type,
  };
};

export const mapWordbookList = (response: GetWordbookListResponse): Wordbook[] => {
  return response.map(mapWordbook);
};
