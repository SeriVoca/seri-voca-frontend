import type { Meta, StoryObj } from '@storybook/react-vite';
import { WordDetail } from '@/components/molecules/WordDetail/WordDetail';

const meta: Meta<typeof WordDetail> = {
  title: 'Molecules/WordDetail',
  component: WordDetail,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof WordDetail>;

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
