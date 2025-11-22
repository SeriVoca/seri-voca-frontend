import { type RouteObject } from 'react-router-dom';
import HomePage from '../components/pages/HomePage';
import WordbookPage from '../components/pages/WordbookPage';
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
        path: '/wordbook',
        element: <WordbookPage />,
      },
      {
        path: '/setting',
        element: <SettingPage />,
      },
    ],
  },
];
