import type { WordResponse } from '../api/word/types';
import type { Word, Meaning } from '../domain/word';

export const mapWordResponseToDomain = (data: WordResponse): Word => {
  return {
    id: data.id,
    textEn: data.en_text,
    meanings: data.meanings
      .sort((a, b) => a.order_index - b.order_index)
      .map<Meaning>((m) => ({
        partOfSpeech: m.part_of_speech,
        textKo: m.meaning,
      })),
  };
};

export const mapWordListResponseToDomain = (data: WordResponse[]): Word[] => {
  return data.map(mapWordResponseToDomain);
};
