import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthGuard } from '@/router/guards/AuthGuard';
import { GuestGuard } from '@/router/guards/GuestGuard';
import { publicRoutes } from '@/router/PublicRoutes';
import { protectedRoutes } from '@/router/ProtectedRoutes';
import { ROUTES } from '@/router/path';

export const router = createBrowserRouter([
  // 1. 로그인한 유저는 접근 못하는 페이지 (로그인 페이지 등)
  {
    element: <GuestGuard />,
    children: [...publicRoutes],
  },

  // 2. 로그인이 필요한 페이지 (설정 페이지, 대시보드 등)
  {
    element: <AuthGuard />,
    children: [...protectedRoutes],
  },

  // 3. 인증 여부 상관없이 접근 가능한 페이지 (소개 페이지, 404 등)
  {
    path: '*',
    element: <Navigate to={ROUTES.WORDBOOKS} replace />, // TODO: <NotFoundPage /> 로 바꾸기
  },
]);
