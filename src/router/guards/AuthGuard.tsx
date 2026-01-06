import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

export const AuthGuard = () => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // 미인증 시 로그인 페이지로 이동 (현재 위치 저장)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
