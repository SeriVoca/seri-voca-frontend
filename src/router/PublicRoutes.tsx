import { type RouteObject } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import TestPage from '../pages/TestPage';

export const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />, // TODO: public layout 추가
  },
  {
    path: '/test',
    element: <TestPage />, // TODO: public layout 추가
  },
];
