import type { Meta, StoryObj } from '@storybook/react-vite';
import { WordList } from './WordList';
import type { WordDetailProps } from '../../molecules/WordDetail/WordDetail';

const meta: Meta<typeof WordList> = {
  title: 'Organisms/WordList',
  component: WordList,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof WordList>;

const mockWords: WordDetailProps[] = [
  { engWord: 'apple', korWord: '사과' },
  { engWord: 'banana', korWord: '바나나' },
  { engWord: 'cherry', korWord: '체리' },
  { engWord: 'orange', korWord: '오렌지' },
  { engWord: 'grape', korWord: '포도' },
];

export const Default: Story = {
  args: {
    words: mockWords,
  },
};

export const Empty: Story = {
  args: {
    words: [],
  },
};
