import { ROUTES } from './path';
import { type RouteObject } from 'react-router-dom';

import BasicLayout from '../layouts/BasicLayout';
import BottomNavLayout from '../layouts/BottomNavLayout';

import HomePage from '../components/pages/HomePage';
import WordbooksPage from '../components/pages/WordbooksPage';
import SettingPage from '../components/pages/SettingPage';
import { WordbookDetailPage } from '../components/pages/WordbookDetailPage';

export const protectedRoutes: RouteObject[] = [
  {
    element: <BottomNavLayout />,
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
  {
    element: <BasicLayout />,
    children: [
      {
        path: '/wordbook/:wordbookId/wordbook-detail',
        element: <WordbookDetailPage />,
      },
    ],
  },
];
