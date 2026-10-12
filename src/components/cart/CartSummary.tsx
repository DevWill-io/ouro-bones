'use client';
import { useCart } from '@/hooks/useCart';

export function CartSummary() {
  const { total } = useCart();
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">Total de unidades</span>
      <span className="font-bold text-lg">{total}</span>
    </div>
  );
}