'use client';
import { create } from 'zustand';

interface UIState {
  mobileMenuOpen: boolean;
  cookieBannerVisible: boolean;
  setMobileMenu: (open: boolean) => void;
  setCookieBanner: (visible: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  cookieBannerVisible: true,
  setMobileMenu: (open) => set({ mobileMenuOpen: open }),
  setCookieBanner: (visible) => set({ cookieBannerVisible: visible }),
}));