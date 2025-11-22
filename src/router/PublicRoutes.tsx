import { type RouteObject } from 'react-router-dom';
import LoginPage from '../components/pages/LoginPage';
import BottomNavLayout from '../layouts/BottomNavLayout';

export const publicRoutes: RouteObject[] = [
  {
    element: <BottomNavLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
];
