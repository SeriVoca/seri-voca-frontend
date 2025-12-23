import { BottomNavItem } from '@/components/atoms/BottomNav/BottomNavItem';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '@/router/path';

const BottomNavbar = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="flex h-[4rem] items-center justify-around">
      <BottomNavItem status="not-ready" selected={path === ROUTES.HOME} navKey="home" />
      <BottomNavItem status="active" selected={path === ROUTES.WORDBOOKS} navKey="word-book" />
      <BottomNavItem status="active" selected={path === ROUTES.SETTING} navKey="setting" />
    </div>
  );
};
export default BottomNavbar;
