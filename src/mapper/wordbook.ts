import type { GetWordbookListResponse } from '../apis/wordbook/types';
import type { Wordbook } from '../domain/wordbook';

type WordbookResponseItem = GetWordbookListResponse[number];

export const mapWordbook = (item: WordbookResponseItem): Wordbook => {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
  };
};

export const mapWordbookList = (response: GetWordbookListResponse): Wordbook[] => {
  return response.map(mapWordbook);
};
