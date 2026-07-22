import type { CreateUserWordRequest, PartOfSpeechResponse, WordResponse } from '@/apis/word/types';
import type { Word, Meaning, PartOfSpeech } from '@/domain/word';

export type CreateUserWordSource = Pick<Word, 'textEn' | 'meanings'>;

export const mapWordResponseToDomain = (data: WordResponse): Word => {
  return {
    id: data.id,
    textEn: data.en_text,
    meanings: data.meanings
      .sort((a, b) => a.order_index - b.order_index)
      .map<Meaning>((m) => ({
        partOfSpeech: POS_RESPONSE_DOMAIN_MAP[m.part_of_speech],
        textKo: m.meaning,
      })),
  };
};

export const mapWordListResponseToDomain = (data: WordResponse[]): Word[] => {
  return data.map(mapWordResponseToDomain);
};

export const mapWordDomainToCreateRequest = (
  data: CreateUserWordSource,
): CreateUserWordRequest => ({
  enText: data.textEn,
  meanings: data.meanings.map((meaning) => ({
    partOfSpeech: POS_DOMAIN_RESPONSE_MAP[meaning.partOfSpeech],
    meaning: meaning.textKo,
  })),
});

export type PartOfSpeechLabel = 'n' | 'pron' | 'v' | 'adj' | 'adv' | 'prep' | 'conj' | 'interj';

export const POS_RESPONSE_DOMAIN_MAP: Record<PartOfSpeechResponse, PartOfSpeech> = {
  NOUN: 'noun',
  PRONOUN: 'pronoun',
  VERB: 'verb',
  ADJECTIVE: 'adjective',
  ADVERB: 'adverb',
  PREPOSITION: 'preposition',
  CONJUNCTION: 'conjunction',
  INTERJECTION: 'interjection',
};

export const POS_DOMAIN_RESPONSE_MAP: Record<PartOfSpeech, PartOfSpeechResponse> = {
  noun: 'NOUN',
  pronoun: 'PRONOUN',
  verb: 'VERB',
  adjective: 'ADJECTIVE',
  adverb: 'ADVERB',
  preposition: 'PREPOSITION',
  conjunction: 'CONJUNCTION',
  interjection: 'INTERJECTION',
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
