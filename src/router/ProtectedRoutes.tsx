import { ROUTES } from '@/router/path';
import { type RouteObject } from 'react-router-dom';

import { BasicLayout } from '@/layouts/BasicLayout';
import { BottomNavLayout } from '@/layouts/BottomNavLayout';

import { HomePage } from '@/components/pages/HomePage/HomePage';
import { WordbooksPage } from '@/components/pages/WordbooksPage/WordbooksPage';
import { SettingPage } from '@/components/pages/SettingPage/SettingPage';
import { WordbookDetailPage } from '@/components/pages/WordbookDetailPage/WordbookDetailPage';
import { UserWordbookDetailPage } from '@/components/pages/UserWordbookDetailPage/UserWordbookDetailPage';

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
        path: ROUTES.WORDBOOK_DETAIL,
        element: <WordbookDetailPage />,
      },
      {
        path: ROUTES.USER_WORDBOOK_DETAIL,
        element: <UserWordbookDetailPage />,
      },
    ],
  },
];
