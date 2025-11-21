import { useNavigate } from 'react-router-dom';
import { BOTTOM_NAV_MAPPER as Mapper, type BOTTOM_NAV_KEY as Key } from './types';
import * as Icons from '@mynaui/icons-react';
import { IconItem } from '../IconItem/IconItem';

type BottomNavItemProps = {
  navKey: Key;
  active: boolean;
};

export const BottomNavItem = ({ navKey, active }: BottomNavItemProps) => {
  const iconName = Mapper[navKey].icon as keyof typeof Icons;
  const IconBg = active ? 'bg-green-300' : '';
  const IconColor = active ? 'white' : 'black';

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(Mapper[navKey].path);
  };

  return (
    <button
      className={`${IconBg} flex h-[3rem] w-[4.5rem] items-center justify-center rounded-[2rem]`}
      onClick={handleClick}
    >
      <IconItem name={iconName} size={20} color={IconColor} />
    </button>
  );
};
