import { type RouteObject } from 'react-router-dom';
import LoginPage from '@/components/pages/LoginPage/LoginPage';
import { ROUTES } from '@/router/path';
import BasicLayout from '@/layouts/BasicLayout';

export const publicRoutes: RouteObject[] = [
  {
    element: <BasicLayout />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
    ],
  },
];
