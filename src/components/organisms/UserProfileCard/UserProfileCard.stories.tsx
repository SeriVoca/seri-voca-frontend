import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserProfileCard } from '@/components/organisms/UserProfileCard/UserProfileCard';

const meta: Meta<typeof UserProfileCard> = {
  title: 'Organisms/UserProfileCard',
  component: UserProfileCard,
  tags: ['autodocs'],
  args: {
    name: '홍길동',
    email: 'hong@example.com',
    profileImage:
      'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&h=200&fit=crop',
  },
  argTypes: {
    profileImage: { control: 'text' },
    name: { control: 'text' },
    email: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof UserProfileCard>;

export const Default: Story = {};

export const NoImage: Story = {
  args: {
    profileImage: null,
  },
};
