import { useNavigate } from 'react-router-dom';
import {
  BOTTOM_NAV_MAPPER as Mapper,
  type BOTTOM_NAV_KEY as Key,
} from '@/components/molecules/BottomNavItem/types';
import * as Icons from '@mynaui/icons-react';
import { Icon } from '@/components/atoms/Icon/Icon';
import type { BOTTOM_NAV_STATUS } from '@/components/molecules/BottomNavItem/constants';

type BottomNavItemProps = {
  navKey: Key;
  status: BOTTOM_NAV_STATUS;
  selected?: boolean;
};

export const BottomNavItem = ({ navKey, status, selected }: BottomNavItemProps) => {
  const iconName = Mapper[navKey].icon as keyof typeof Icons;
  const IconColor = selected ? 'white' : 'black';

  const BgByStatus: Record<BOTTOM_NAV_STATUS, string> = {
    active: 'bg-green-300',
    'not-ready': 'bg-red-300',
    disabled: '',
  };

  const navigate = useNavigate();

  const handleClick = () => {
    if (status === 'active') navigate(Mapper[navKey].path);
    else if (status === 'not-ready') alert('준비 중입니다.');
  };

  return (
    <button
      className={`${selected ? BgByStatus[status] : ''} flex h-[3rem] w-[4.5rem] items-center justify-center rounded-[2rem]`}
      onClick={handleClick}
      disabled={status === 'disabled'}
    >
      <Icon name={iconName} size={20} color={IconColor} />
    </button>
  );
};
