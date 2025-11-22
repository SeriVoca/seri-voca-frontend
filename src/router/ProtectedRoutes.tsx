import { type RouteObject } from 'react-router-dom';
import HomePage from '../components/pages/HomePage';
import WordbooksPage from '../components/pages/WordbooksPage';
import Layout from '../layouts/Layout';
import SettingPage from '../components/pages/SettingPage';

export const protectedRoutes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/wordbooks',
        element: <WordbooksPage />,
      },
      {
        path: '/setting',
        element: <SettingPage />,
      },
    ],
  },
];
