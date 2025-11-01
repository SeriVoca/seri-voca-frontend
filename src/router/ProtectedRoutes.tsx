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
        element: <HomePage />, // TODO: protected layout 추가
      },
      {
        path: '/wordbook',
        element: <WordbookPage />, // TODO: protected layout 추가
      },
      {
        path: '/setting',
        element: <SettingPage />, // TODO: protected layout 추가
      },
    ],
  },
];
