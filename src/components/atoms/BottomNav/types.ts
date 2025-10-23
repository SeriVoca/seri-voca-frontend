import * as Icons from '@mynaui/icons-react';

export type BOTTOMM_NAV_KEY = 'home' | 'word-book' | 'setting';

export type BOTTOM_NAV_ITEM = {
  key: BOTTOMM_NAV_KEY;
  path: string;
  status?: 'ready' | 'disabled';
  icon: keyof typeof Icons;
};

export const BOTTOM_NAV_MAPPER: Record<BOTTOMM_NAV_KEY, BOTTOM_NAV_ITEM> = {
  home: {
    key: 'home',
    path: '/',
    status: 'ready',
    icon: 'Lock',
  },
  'word-book': {
    key: 'word-book',
    path: '/word-book',
    status: 'ready',
    icon: 'Lock',
  },
  setting: {
    key: 'setting',
    path: '/setting',
    status: 'ready',
    icon: 'Lock',
  },
};
