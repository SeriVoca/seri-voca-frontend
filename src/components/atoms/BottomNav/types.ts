import * as Icons from '@mynaui/icons-react';

export type BOTTOM_NAV_KEY = 'home' | 'word-book' | 'setting';

/*
  @param
  - navKey : 네비게이션 아이템 키
  - path : 네비게이션 경로
  - status : 네비게이션 활성화 여부
  - icon : 네비게이션 아이콘 이름
*/

export type BOTTOM_NAV_ITEM = {
  navKey: BOTTOM_NAV_KEY;
  path: string;
  status?: 'ready' | 'disabled';
  icon: keyof typeof Icons;
};

export const BOTTOM_NAV_MAPPER: Record<BOTTOM_NAV_KEY, BOTTOM_NAV_ITEM> = {
  home: {
    navKey: 'home',
    path: '/',
    status: 'ready',
    icon: 'Lock',
  },
  'word-book': {
    navKey: 'word-book',
    path: '/wordbook',
    status: 'ready',
    icon: 'BookOpen',
  },
  setting: {
    navKey: 'setting',
    path: '/setting',
    status: 'ready',
    icon: 'User',
  },
};
