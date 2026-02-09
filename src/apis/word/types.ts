import type { PartOfSpeech } from '@/mapper/word';

export interface WordResponse {
  id: string;
  en_text: string;
  order_index: number;
  meanings: {
    part_of_speech: PartOfSpeech;
    meaning: string;
    order_index: number;
  }[];
}
