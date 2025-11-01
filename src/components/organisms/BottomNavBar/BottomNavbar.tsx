import { BottomNavItem } from '../../atoms/BottomNav/BottomNavItem';
import { useLocation } from 'react-router-dom';

const BottomNavbar = () => {
  const location = useLocation();
  const path = location.pathname;
  console.log('Current path:', path);
  return (
    <div className="flex justify-around">
      <BottomNavItem active={path === '/'} navKey="home" />
      <BottomNavItem active={path === '/word-book'} navKey="word-book" />
      <BottomNavItem active={path === '/setting'} navKey="setting" />
    </div>
  );
};
export default BottomNavbar;
