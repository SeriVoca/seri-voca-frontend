import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const GuestGuard = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    // 이미 로그인했는데 로그인 페이지 접근 시 메인으로 이동
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default GuestGuard;
