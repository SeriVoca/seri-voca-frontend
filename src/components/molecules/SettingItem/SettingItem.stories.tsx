import type { Meta, StoryObj } from '@storybook/react-vite';
import { SettingItem } from '@/components/molecules/SettingItem/SettingItem';

const meta: Meta<typeof SettingItem> = {
  title: 'Molecules/SettingItem',
  component: SettingItem,
  tags: ['autodocs'],
  args: {
    label: '로그아웃',
    handleNavigate: () => alert('clicked!'),
  },
  argTypes: {
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof SettingItem>;

export const Default: Story = {};

export const Withdraw: Story = {
  args: {
    label: '회원탈퇴',
  },
};
