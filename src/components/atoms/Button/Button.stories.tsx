import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

// 기본 버튼
export const Primary: Story = {
  args: {
    content: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    content: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Disabled: Story = {
  args: {
    content: 'Disabled Button',
    variant: 'disabled',
  },
};

// custom 가능
export const CustomClasses: Story = {
  args: {
    content: 'Custom Styled',
    variant: 'primary',
    className: 'text-white border border-black',
  },
};
