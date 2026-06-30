// 단어장 응답 본문 (평탄한 형태)
export type WordbookResponse = {
  id: string;
  title: string;
  description: string | null;
  type: 'SYSTEM' | 'USER';
};

// order_index로 감싼 형태 (정렬 순서를 가진 목록 응답)
export type OrderedWordbookResponse = {
  order_index: number;
  wordbook: WordbookResponse;
};
