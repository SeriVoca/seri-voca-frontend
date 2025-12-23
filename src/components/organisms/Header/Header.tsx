import { type ReactNode } from 'react';
import { Icon } from '@/components/atoms/Icon/Icon';

export type HeaderProps = {
  title: string;
  variant?: 'basic' | 'LCTA';
  LCTAIcon?: string;
  onLCTAClick?: () => void;
};

const Header = ({ title, variant = 'basic', LCTAIcon, onLCTAClick }: HeaderProps) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <header className="flex h-[56px] w-full items-center bg-white px-4 shadow-sm">
      {children}
    </header>
  );

  /** 1) basic — 타이틀만 */
  if (variant === 'basic') {
    return (
      <Wrapper>
        <h1 className="text-lg font-semibold">{title}</h1>
      </Wrapper>
    );
  }

  /** 2) LCTA — 왼쪽 아이콘 + 중앙 제목 */
  if (variant === 'LCTA') {
    return (
      <Wrapper>
        <button className="flex cursor-pointer items-center" onClick={onLCTAClick}>
          {LCTAIcon && <Icon name={LCTAIcon} />}
        </button>

        <h1 className="flex-1 text-center text-lg font-semibold">{title}</h1>

        <div className="pointer-events-none opacity-0">{LCTAIcon && <Icon name={LCTAIcon} />}</div>
      </Wrapper>
    );
  }

  return null;
};

export default Header;
