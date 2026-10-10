// lib/zustand/useCartStore.ts
"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const MIN_ORDER_UNITS = 30;

export type CartItem = {
  id: string;              // id do produto
  name: string;
  variant: string;         // ex: "Preto / Bordado Frontal"
  unitPrice: number;       // preço unitário (atacado)
  quantity: number;
  imageUrl?: string;
  notes?: string;          // observações de personalização
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;

  // ações
  open: () => void;
  close: () => void;
  toggle: () => void;

  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (id: string, variant: string) => void;
  updateQuantity: (id: string, variant: string, qty: number) => void;
  updateNotes: (id: string, variant: string, notes: string) => void;
  clear: () => void;

  // seletores computados
  totalUnits: () => number;
  totalPrice: () => number;
  missingUnits: () => number;
  canCheckout: () => boolean;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      open:  () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (item, qty = 1) =>
        set((state) => {
          const idx = state.items.findIndex(
            (i) => i.id === item.id && i.variant === item.variant
          );
          if (idx >= 0) {
            const next = [...state.items];
            next[idx] = { ...next[idx], quantity: next[idx].quantity + qty };
            return { items: next, isOpen: true };
          }
          return { items: [...state.items, { ...item, quantity: qty }], isOpen: true };
        }),

      removeItem: (id, variant) =>
        set((s) => ({
          items: s.items.filter((i) => !(i.id === id && i.variant === variant)),
        })),

      updateQuantity: (id, variant, qty) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.id === id && i.variant === variant
              ? { ...i, quantity: Math.max(1, Math.floor(qty)) }
              : i
          ),
        })),

      updateNotes: (id, variant, notes) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.id === id && i.variant === variant ? { ...i, notes } : i
          ),
        })),

      clear: () => set({ items: [] }),

      totalUnits: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce((acc, i) => acc + i.quantity * i.unitPrice, 0),
      missingUnits: () => Math.max(0, MIN_ORDER_UNITS - get().totalUnits()),
      canCheckout: () => get().totalUnits() >= MIN_ORDER_UNITS,
    }),
    {
      name: "ouro-bones-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items }), // não persiste isOpen
    }
  )
);