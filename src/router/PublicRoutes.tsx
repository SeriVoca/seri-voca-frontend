import { type RouteObject } from 'react-router-dom';
import LoginPage from '../components/pages/LoginPage';
import Layout from '../layouts/Layout';

export const publicRoutes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />, // TODO: public layout 추가
      },
      {
        path: '/login',
        element: <LoginPage />, // TODO: public layout 추가
      },
    ],
  },
];
