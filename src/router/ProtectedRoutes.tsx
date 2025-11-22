import { type RouteObject } from 'react-router-dom';
import HomePage from '../components/pages/HomePage';
import WordbookPage from '../components/pages/WordbookPage';
import Layout from '../layouts/Layout';
import SettingPage from '../components/pages/SettingPage';
import { WordbookDetailPage } from '../components/pages/WordbookDetailPage';

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
        children: [
          {
            index: true,
            element: <WordbookPage />,
          },
          {
            path: ':day/wordbook-detail',
            element: <WordbookDetailPage />,
          },
        ],
      },
      {
        path: '/setting',
        element: <SettingPage />,
      },
    ],
  },
];
