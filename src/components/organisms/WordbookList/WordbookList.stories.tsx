import type { Meta, StoryObj } from '@storybook/react-vite';
import { WordbookList } from './WordbookList';

const meta: Meta<typeof WordbookList> = {
  title: 'Components/WordbookList',
  component: WordbookList,
  decorators: (Story) => (
    <div style={{ background: '#EEEEEE' }}>
      <Story />
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof WordbookList>;

export const Default: Story = {
  args: {
    wordbooks: [
      { id: 1, title: 'Day 1 - Basics', caption: '기초 단어 20개' },
      { id: 2, title: 'Day 2 - Verbs', caption: '동사 중심 구성' },
      { id: 3, title: 'Day 3 - Travel', caption: '여행 단어 모음' },
    ],
    handleNavigate: (id: number) => {
      console.log(`Navigate wordbook: ${id}`);
    },
  },
};

export const Empty: Story = {
  args: {
    wordbooks: [],
    handleNavigate: (id: number) => {
      console.log(`Navigate: ${id}`);
    },
  },
};

export const ManyItems: Story = {
  args: {
    wordbooks: Array.from({ length: 10 }).map((_, i) => ({
      id: i + 1,
      title: `Wordbook #${i + 1}`,
      caption: `캡션 테스트 ${i + 1}`,
    })),
    handleNavigate: (id: number) => {
      console.log(`Navigate: ${id}`);
    },
  },
};
