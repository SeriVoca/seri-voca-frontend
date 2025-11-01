import { Outlet } from 'react-router-dom';
import BottomNavbar from '../components/organisms/BottomNavBar/BottomNavbar';

const Layout = () => {
  return (
    <div className="flex h-[48.75rem] w-[22.5rem] flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
      <BottomNavbar />
    </div>
  );
};

export default Layout;
