'use client';
import { create } from 'zustand';
import type { AdminUser } from '@/types/user';

interface AuthState {
  user: AdminUser | null;
  loading: boolean;
  setUser: (user: AdminUser | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),
  setLoading: (loading) => set({ loading }),
}));