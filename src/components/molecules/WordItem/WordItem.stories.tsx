import type { Meta, StoryObj } from '@storybook/react-vite';
import { WordItem } from '@/components/molecules/WordItem/WordItem';

const meta: Meta<typeof WordItem> = {
  title: 'Molecules/WordDetail',
  component: WordItem,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof WordItem>;

export const Default: Story = {
  args: {
    word: {
      id: '1',
      textEn: 'apple',
      meanings: [],
    },
  },
};

export const LongText: Story = {
  args: {
    word: {
      id: '2',
      textEn: 'internationalization',
      meanings: [],
    },
  },
};
