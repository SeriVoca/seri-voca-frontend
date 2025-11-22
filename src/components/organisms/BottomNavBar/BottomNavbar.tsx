import { BottomNavItem } from '../../atoms/BottomNav/BottomNavItem';
import { useLocation } from 'react-router-dom';

const BottomNavbar = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="flex h-[4rem] items-center justify-around">
      <BottomNavItem status="not-ready" selected={path === '/'} navKey="home" />
      <BottomNavItem status="active" selected={path === '/wordbook'} navKey="word-book" />
      <BottomNavItem status="active" selected={path === '/setting'} navKey="setting" />
    </div>
  );
};
export default BottomNavbar;
