import * as Icons from '@mynaui/icons-react';
import { BOTTOM_NAV_MAPPER as Mapper, type BOTTOMM_NAV_KEY as Key } from './types';

type BottomNavItemProps = {
  key: Key;
};

export const BottomNavItem = ({ key }: BottomNavItemProps) => {
  const IconComponent = Icons[Mapper[key].icon] as React.ComponentType<{ size: number }>;

  return (
    <div className="flex h-3 w-4.5 items-center justify-center">
      <IconComponent size={24} />
    </div>
  );
};
