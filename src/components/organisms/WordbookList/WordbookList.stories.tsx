import type { Meta, StoryObj } from '@storybook/react-vite';
import { WordbookList } from '@/components/organisms/WordbookList/WordbookList';

const meta: Meta<typeof WordbookList> = {
  title: 'Components/WordbookList',
  component: WordbookList,
  decorators: [
    (Story) => (
      <div style={{ background: '#EEEEEE' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof WordbookList>;

export const Default: Story = {
  args: {
    wordbooks: [
      { id: 'a', title: 'Day 1 - Basics', description: '기초 단어 20개' },
      { id: 'b', title: 'Day 2 - Verbs', description: '동사 중심 구성' },
      { id: 'c', title: 'Day 3 - Travel', description: '여행 단어 모음' },
    ],
    handleNavigate: (id: string) => {
      console.log(`Navigate wordbook: ${id}`);
    },
  },
};

export const Empty: Story = {
  args: {
    wordbooks: [],
    handleNavigate: (id: string) => {
      console.log(`Navigate: ${id}`);
    },
  },
};

export const ManyItems: Story = {
  args: {
    wordbooks: Array.from({ length: 10 }).map((_, i) => ({
      id: String(i + 1),
      title: `Wordbook #${i + 1}`,
      description: `캡션 테스트 ${i + 1}`,
    })),
    handleNavigate: (id: string) => {
      console.log(`Navigate: ${id}`);
    },
  },
};
