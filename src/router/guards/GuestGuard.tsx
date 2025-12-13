import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { ROUTES } from '../path';

const GuestGuard = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    // 이미 로그인했는데 로그인 페이지 접근 시 메인으로 이동
    // TODO: 나중에 ROUTES.HOME 으로 바꾸기
    return <Navigate to={ROUTES.WORDBOOKS} replace />;
  }

  return <Outlet />;
};

export default GuestGuard;
