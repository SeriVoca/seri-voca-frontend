import type { Meta, StoryObj } from '@storybook/react-vite';
import { SettingList } from '@/components/organisms/SettingList/SettingList';

const meta: Meta<typeof SettingList> = {
  title: 'Organisms/SettingList',
  component: SettingList,
  tags: ['autodocs'],
  args: {
    items: [
      {
        label: '로그아웃',
        handleNavigate: () => alert('로그아웃 클릭됨!'),
      },
      {
        label: '회원탈퇴',
        handleNavigate: () => alert('회원탈퇴 클릭됨!'),
      },
      {
        label: '알림 설정',
        handleNavigate: () => alert('알림 설정 클릭됨!'),
      },
    ],
  },
  argTypes: {
    items: { control: false }, // 배열 컨트롤 비활성화 (불필요해서)
  },
};

export default meta;
type Story = StoryObj<typeof SettingList>;

export const Default: Story = {};

export const TwoItems: Story = {
  args: {
    items: [
      { label: '로그아웃', handleNavigate: () => alert('로그아웃 클릭됨!') },
      { label: '회원탈퇴', handleNavigate: () => alert('회원탈퇴 클릭됨!') },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: '알림 설정', handleNavigate: () => alert('알림 설정 클릭됨!') }],
  },
};
