import * as Icons from '@mynaui/icons-react';
import type { ComponentType } from 'react';

type IconItemProps = {
  name: string; // 아이콘 name
  size?: number; // 크기
  color?: string; // 색상
  className?: string; // wrapper 스타일
};

export const Icon = ({ name, size = 20, color = 'black', className = '' }: IconItemProps) => {
  const IconComponent = (Icons as Record<string, unknown>)[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in @mynaui/icons-react`);
    return null;
  }

  const Icon = IconComponent as ComponentType<{
    size?: number;
    color?: string;
  }>;

  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      <Icon size={size} color={color} />
    </span>
  );
};
