import { type RouteObject } from 'react-router-dom';
import HomePage from '../pages/HomePage';

export const protectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />, // TODO: protected layout 추가
  },
];
