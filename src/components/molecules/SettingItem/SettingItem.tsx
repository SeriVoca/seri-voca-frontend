import { Icon } from '../../atoms/Icon/Icon';

export type SettingItemProps = {
  label: string;
  handleNavigate: () => void;
};

export const SettingItem = ({ label, handleNavigate }: SettingItemProps) => {
  return (
    <div className="flex w-full justify-between">
      {label}
      <button onClick={handleNavigate}>
        <Icon name="ChevronRight" size={20} />
      </button>
    </div>
  );
};
