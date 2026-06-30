export type GetWordbookListResponse = {
  order_index: number;
  wordbook: {
    id: string;
    title: string;
    description: string | null;
    type: 'SYSTEM' | 'USER';
  };
}[];

export type GetWordbookResponse = {
  id: string;
  title: string;
  description: string | null;
  type: 'SYSTEM' | 'USER';
};
