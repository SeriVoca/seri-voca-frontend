import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface InputProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { value, defaultValue, placeholder, type = 'text', disabled = false, onChange, className },
    ref,
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        className={twMerge(
          'h-[2.25rem] w-full rounded-md bg-[#e9e9e9] px-2 text-sm focus:outline-none disabled:opacity-50',
          className,
        )}
      />
    );
  },
);

Input.displayName = 'Input';
