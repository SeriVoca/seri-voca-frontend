import type { Meta, StoryObj } from '@storybook/react-vite';
import { WordbookItem } from './WordbookItem';

const meta: Meta<typeof WordbookItem> = {
  title: 'Components/WordbookItem',
  component: WordbookItem,
  decorators: [
    (Story) => (
      <div style={{ background: '#eeeeee', padding: '24px', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof WordbookItem>;

export const Default: Story = {
  args: {
    title: 'Day 1 Vocabulary',
    caption: '기초 단어 20개 정리',
    handleNavigate: () => {
      console.log('Navigate: Day 1 Vocabulary');
    },
  },
};

export const LongText: Story = {
  args: {
    title: 'Advanced Vocabulary Collection',
    caption: '긴 캡션 테스트용입니다. 여러 줄 설명을 렌더링하여 UI가 깨지지 않는지 확인하세요.',
    handleNavigate: () => {
      console.log('Navigate: Advanced Vocabulary');
    },
  },
};

export const Another: Story = {
  args: {
    title: '영어 회화 주제별 단어장',
    caption: '카페/식당/여행 관련 주제별 단어 목록',
    handleNavigate: () => {
      console.log('Navigate: Conversation Wordbook');
    },
  },
};
