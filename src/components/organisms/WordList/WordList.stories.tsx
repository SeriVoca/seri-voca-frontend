import type { Meta, StoryObj } from '@storybook/react-vite';
import { WordList } from './WordList';
import type { Word } from '../../../domain/word';

const meta: Meta<typeof WordList> = {
  title: 'Organisms/WordList',
  component: WordList,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof WordList>;

const mockWords: Word[] = [
  {
    id: 'apple',
    textEn: 'apple',
    meanings: [
      {
        partOfSpeech: 'n',
        textKo: '사과',
      },
    ],
  },
  {
    id: 'banana',
    textEn: 'banana',
    meanings: [
      {
        partOfSpeech: 'n',
        textKo: '바나나',
      },
    ],
  },
  {
    id: 'cherry',
    textEn: 'cherry',
    meanings: [
      {
        partOfSpeech: 'n',
        textKo: '체리',
      },
    ],
  },
  {
    id: 'orange',
    textEn: 'orange',
    meanings: [
      {
        partOfSpeech: 'n',
        textKo: '오렌지',
      },
    ],
  },
  {
    id: 'grape',
    textEn: 'grape',
    meanings: [
      {
        partOfSpeech: 'n',
        textKo: '포도',
      },
    ],
  },
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
