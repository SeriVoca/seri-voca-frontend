type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
};

export const Button = ({ children, variant = 'primary', onClick }: ButtonProps) => {
  const style = variant === 'primary' ? 'bg-[#a4ec13] text-gray-700' : 'bg-[#f2f4f0] text-gray-700';
  return (
    <button
      className={`cursor-pointer rounded-xl px-8 py-2 text-sm font-semibold ${style}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
