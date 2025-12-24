import { Icon } from '@/components/atoms/Icon/Icon';

type Props = {
  title: string;
  caption: string;
  handleNavigate: () => void;
};

export const WordbookItem = ({ title: name, caption, handleNavigate }: Props) => {
  return (
    <div className="flex h-[4.5rem] shrink-0 items-center justify-between rounded-4xl bg-white pr-[0.75rem] pl-[1.5rem]">
      {/* Text */}
      <div className="flex min-w-0 flex-col">
        <div className="truncate text-xl">{name}</div>
        <div className="truncate text-xs text-gray-700">{caption}</div>
      </div>
      {/* Action */}
      <div>
        <button onClick={handleNavigate}>
          <Icon name="ChevronRight" color="#B4E35A" />
        </button>
      </div>
    </div>
  );
};
