import { createBrowserRouter, Navigate } from 'react-router-dom';
import { publicRoutes } from './PublicRoutes';
import { protectedRoutes } from './ProtectedRoutes';

// TODO: 404 페이지 추가
const router = createBrowserRouter([
  ...publicRoutes,
  ...protectedRoutes,
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);

export default router;
