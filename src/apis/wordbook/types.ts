export type GetWordbookListResponse = {
  order_index: number;
  wordbook: {
    id: string;
    title: string;
    description: string;
    type: 'SYSTEM' | 'USER';
  };
}[];
