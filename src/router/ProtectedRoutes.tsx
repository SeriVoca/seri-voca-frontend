import { type RouteObject } from 'react-router-dom';
import HomePage from '../components/pages/HomePage';
import WordbooksPage from '../components/pages/WordbooksPage';
import Layout from '../layouts/Layout';
import SettingPage from '../components/pages/SettingPage';
import { ROUTES } from './path';

export const protectedRoutes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <HomePage />,
      },
      {
        path: ROUTES.WORDBOOKS,
        element: <WordbooksPage />,
      },
      {
        path: ROUTES.SETTING,
        element: <SettingPage />,
      },
    ],
  },
];
