import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  avatar_url: string;
  // TODO: 필요하면 추가
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false, // TODO: 로컬스토리지나 세션 확인 로직 필요
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
