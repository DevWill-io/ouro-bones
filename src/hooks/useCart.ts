'use client';
import { useCartStore } from '@/stores/cartStore';
import { MIN_ORDER } from '@/lib/constants';

export function useCart() {
  const items = useCartStore((s) => s.items);
  const total = items.reduce((sum, i) => sum + i.quantity, 0);
  const remaining = Math.max(0, MIN_ORDER - total);
  const canCheckout = total >= MIN_ORDER;
  return { items, total, remaining, canCheckout };
}