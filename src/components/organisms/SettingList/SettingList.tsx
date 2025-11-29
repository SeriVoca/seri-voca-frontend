import { SettingItem } from '../../molecules/SettingItem/SettingItem';
import { type SettingItemProps } from '../../molecules/SettingItem/SettingItem';

type Props = {
  items: SettingItemProps[];
};

export const SettingList = ({ items }: Props) => {
  return (
    <div className="flex flex-col gap-[1.25rem] p-[1.5rem]">
      {items.map((item, idx) => (
        <SettingItem key={idx} label={item.label} handleNavigate={item.handleNavigate} />
      ))}
    </div>
  );
};
