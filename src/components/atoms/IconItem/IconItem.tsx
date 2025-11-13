import * as Icons from '@mynaui/icons-react';

type IconItemProps = {
  name: string; // 아이콘 name
  size?: number; // 크기
  color?: string; // 색상
  className?: string; // optional wrapper 스타일
  onClick?: () => void; // 클릭 핸들러
};

export const IconItem = ({
  name,
  size = 20,
  color = 'black',
  className = '',
  onClick,
}: IconItemProps) => {
  // name → 실제 아이콘 컴포넌트 찾기
  const IconComponent = (Icons as Record<string, unknown>)[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in @mynaui/icons-react`);
    return null;
  }

  const Icon = IconComponent as React.ComponentType<{ size?: number; color?: string }>;

  return (
    <button className={`flex items-center justify-center ${className}`} onClick={onClick}>
      <Icon size={size} color={color} />
    </button>
  );
};
