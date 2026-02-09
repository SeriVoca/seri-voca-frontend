/*
 * Button Component
 *
 * @param content - 버튼에 표시할 텍스트
 * @param variant - 버튼의 variant
 * @param onClick - 버튼 클릭 이벤트 핸들러
 * @param className - 추가 스타일
 *
 * [V] 스타일 적용 방식
 * [V] 스타일 코드 위치
 * [V] main props 타입 정의 (children X, content O)
 */

import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  content: string;
  variant?: 'primary' | 'secondary' | 'disabled';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

export const Button = ({ content, variant, onClick, type = 'button', className }: ButtonProps) => {
  // 스타일 정의
  const baseStyle = 'px-8 py-2 rounded-xl text-sm font-semibold bg-[#f2f4f0]'; // 기본 스타일
  const variantStyle = variant ? ButtonStyle[variant] : ''; // variant 스타일
  const classNameStyle = className ? className : ''; // 추가 스타일

  // 스타일 순차 병합
  const mergedStyle = twMerge(baseStyle, variantStyle, classNameStyle);

  return (
    <button type={type} className={mergedStyle} onClick={onClick} disabled={variant === 'disabled'}>
      {content}
    </button>
  );
};

// variant
const ButtonStyle = {
  primary: 'bg-[#b4e35a] text-[#f5f5f5] cursor-pointer',
  secondary: 'bg-[#f5f5f5] text-[#9d9d9d] cursor-pointer',
  disabled: 'bg-gray-200 text-gray-400 cursor-not-allowed',
};
