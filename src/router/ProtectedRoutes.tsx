import { type RouteObject } from 'react-router-dom';
import HomePage from '../components/pages/HomePage';
import WordbookPage from '../components/pages/WordbookPage';
import BottomNavLayout from '../layouts/BottomNavLayout';
import SettingPage from '../components/pages/SettingPage';
import { WordbookDetailPage } from '../components/pages/WordbookDetailPage';
import BasicLayout from '../layouts/BasicLayout';

export const protectedRoutes: RouteObject[] = [
  {
    element: <BottomNavLayout />,
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
