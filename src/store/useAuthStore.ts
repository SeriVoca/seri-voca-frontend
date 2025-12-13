import { create } from 'zustand';
import { type User } from '@supabase/supabase-js'; // Supabase 타입 사용

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setLogin: (user: User) => void;
  setLogout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setLogin: (user) => set({ user, isAuthenticated: true }),
  setLogout: () => set({ user: null, isAuthenticated: false }),
}));
