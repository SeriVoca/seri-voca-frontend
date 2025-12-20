type Props = {
  label: string;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
};

const TabItem = ({ label, active, onClick }: Props) => {
  return (
    <button
      className={`flex h-7 w-full items-center justify-center rounded-full px-2 py-1 ${
        active ? 'bg-[#b4e35a]' : 'bg-gray-200'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default TabItem;
