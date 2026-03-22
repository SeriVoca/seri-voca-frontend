export interface WordResponse {
  id: string;
  en_text: string;
  order_index: number;
  meanings: {
    part_of_speech: PartOfSpeechResponse;
    meaning: string;
    order_index: number;
  }[];
}

export type PartOfSpeechResponse =
  | 'NOUN'
  | 'PRONOUN'
  | 'VERB'
  | 'ADJECTIVE'
  | 'ADVERB'
  | 'PREPOSITION'
  | 'CONJUNCTION'
  | 'INTERJECTION';
