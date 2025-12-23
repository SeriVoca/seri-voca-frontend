import { SettingItem } from '@/components/molecules/SettingItem/SettingItem';
import { type SettingItemProps } from '@/components/molecules/SettingItem/SettingItem';

type Props = {
  items: SettingItemProps[];
};

export const SettingList = ({ items }: Props) => {
  return (
    <div className="flex w-full flex-col gap-[1.25rem] bg-white p-[1.5rem]">
      {items.map((item, idx) => (
        <SettingItem key={idx} label={item.label} handleNavigate={item.handleNavigate} />
      ))}
    </div>
  );
};
