import { type ReactNode, type RefObject } from 'react';
import { Icon } from '@/components/atoms/Icon/Icon';

export type HeaderProps = {
  title: string;
  variant?: 'basic' | 'LCTA' | 'LRCTA';
  LCTAIcon?: string;
  onLCTAClick?: () => Promise<void> | void;
  RCTAIcon?: string;
  onRCTAClick?: () => Promise<void> | void;
  RCTARef?: RefObject<HTMLButtonElement | null>;
};

export const Header = ({
  title,
  variant = 'basic',
  LCTAIcon,
  onLCTAClick,
  RCTAIcon,
  onRCTAClick,
  RCTARef,
}: HeaderProps) => {
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
        <button type="button" className="flex cursor-pointer items-center" onClick={onLCTAClick}>
          {LCTAIcon && <Icon name={LCTAIcon} />}
        </button>

        <h1 className="flex-1 text-center text-lg font-semibold">{title}</h1>

        <div className="pointer-events-none opacity-0">{LCTAIcon && <Icon name={LCTAIcon} />}</div>
      </Wrapper>
    );
  }

  if (variant === 'LRCTA') {
    return (
      <Wrapper>
        <button type="button" className="flex cursor-pointer items-center" onClick={onLCTAClick}>
          {LCTAIcon && <Icon name={LCTAIcon} />}
        </button>

        <h1 className="flex-1 text-center text-lg font-semibold">{title}</h1>

        <button
          ref={RCTARef}
          type="button"
          className="flex cursor-pointer items-center"
          onClick={onRCTAClick}
        >
          {RCTAIcon && <Icon name={RCTAIcon} />}
        </button>
      </Wrapper>
    );
  }

  return null;
};
