import type { Meta, StoryObj } from '@storybook/react-vite';
import { WordDetail } from './WordDetail';
const meta: Meta<typeof WordDetail> = {
  title: 'Molecules/WordDetail',
  component: WordDetail,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof WordDetail>;

export const Default: Story = {
  args: {
    engWord: 'apple',
    korWord: '사과',
  },
};

export const LongText: Story = {
  args: {
    engWord: 'internationalization',
    korWord: '국제화',
  },
};
