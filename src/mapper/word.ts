import type { PartOfSpeechResponse, WordResponse } from '@/apis/word/types';
import type { Word, Meaning, PartOfSpeech } from '@/domain/word';

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

export type PartOfSpeechLabel = 'n' | 'pron' | 'v' | 'adj' | 'adv' | 'prep' | 'conj' | 'interj';

export const POS_RESPONSE_DOMAIN_MAP: Record<PartOfSpeechResponse, PartOfSpeech> = {
  noun: 'noun',
  pronoun: 'pronoun',
  verb: 'verb',
  adjective: 'adjective',
  adverb: 'adverb',
  preposition: 'preposition',
  conjunction: 'conjunction',
  interjection: 'interjection',
};

export const POS_DOMAIN_LABEL_MAP: Record<PartOfSpeech, PartOfSpeechLabel> = {
  noun: 'n',
  pronoun: 'pron',
  verb: 'v',
  adjective: 'adj',
  adverb: 'adv',
  preposition: 'prep',
  conjunction: 'conj',
  interjection: 'interj',
};

export const mapPosToLabel = (pos: PartOfSpeech): PartOfSpeechLabel => {
  return POS_DOMAIN_LABEL_MAP[pos] ?? pos;
};
