import { BOTTOM_NAV_MAPPER as Mapper, type BOTTOMM_NAV_KEY as Key } from './types';
import * as Icons from '@mynaui/icons-react';

type BottomNavItemProps = {
  navKey: Key;
};

export const BottomNavItem = ({ navKey }: BottomNavItemProps) => {
  const iconName = Mapper[navKey].icon as keyof typeof Icons;
  const Icon = Icons[iconName] as React.ComponentType<{ size?: number; color?: string }>;

  return (
    <div className="flex h-3 w-4.5 items-center justify-center">
      {Icon ? <Icon size={20} /> : null}
    </div>
  );
};
