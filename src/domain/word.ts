export type PartOfSpeech =
  | 'noun'
  | 'pronoun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'preposition'
  | 'conjunction'
  | 'interjection';

export interface Meaning {
  partOfSpeech: PartOfSpeech;
  textKo: string;
}

export interface Word {
  id: string;
  textEn: string;
  meanings: Meaning[];
}
