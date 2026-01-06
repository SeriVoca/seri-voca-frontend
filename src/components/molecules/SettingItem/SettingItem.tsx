import { Icon } from '@/components/atoms/Icon/Icon';

export type SettingItemProps = {
  label: string;
  handleNavigate: () => Promise<void> | void;
};

export const SettingItem = ({ label, handleNavigate }: SettingItemProps) => {
  return (
    <div className="flex w-full justify-between">
      {label}
      <button type="button" onClick={handleNavigate} className="flex items-center">
        <Icon name="ChevronRight" size={20} />
      </button>
    </div>
  );
};
