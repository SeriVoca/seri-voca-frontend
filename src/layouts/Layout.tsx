import { Outlet } from 'react-router-dom';
import BottomNavbar from '../components/organisms/BottomNavBar/BottomNavbar';

const Layout = () => {
  return (
    <div className="flex justify-center bg-gray-100">
      <div className="flex h-dvh w-dvw flex-col bg-white sm:w-[360px]">
        <main className="flex min-h-0 flex-1 flex-col">
          <Outlet />
        </main>
        <footer>
          <BottomNavbar />
        </footer>
      </div>
    </div>
  );
};

export default Layout;
