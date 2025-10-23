import { type RouteObject } from 'react-router-dom';
import LoginPage from '../components/pages/LoginPage';

export const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />, // TODO: public layout 추가
  },
];
