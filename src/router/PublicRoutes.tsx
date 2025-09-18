import { type RouteObject } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

export const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />, // TODO: public layout 추가
  },
];
