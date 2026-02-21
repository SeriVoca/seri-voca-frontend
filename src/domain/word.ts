export const PARTS_OF_SPEECH = [
  'noun',
  'pronoun',
  'verb',
  'adjective',
  'adverb',
  'preposition',
  'conjunction',
  'interjection',
] as const;

export type PartOfSpeech = (typeof PARTS_OF_SPEECH)[number];

export interface Meaning {
  partOfSpeech: PartOfSpeech;
  textKo: string;
}

export interface Word {
  id: string;
  textEn: string;
  meanings: Meaning[];
}
