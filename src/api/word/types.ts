export interface WordResponse {
  id: string;
  en_text: string;
  order_index: number;
  meanings: {
    part_of_speech: string;
    meaning: string;
    order_index: number;
  }[];
}
