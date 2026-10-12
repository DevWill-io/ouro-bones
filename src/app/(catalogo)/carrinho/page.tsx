'use client';
import { useCartStore } from '@/stores/cartStore';
import { CartItem } from '@/components/cart/CartItem';
import { MinimumOrderAlert } from '@/components/cart/MinimumOrderAlert';
import { WhatsAppCheckoutButton } from '@/components/cart/WhatsAppCheckoutButton';
import { useCart } from '@/hooks/useCart';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CarrinhoPage() {
  const items = useCartStore((s) => s.items);
  const { total } = useCart();

  return (
    <div className="container py-10 lg:py-16 max-w-3xl">
      <h1 className="text-3xl font-bold">Seu orçamento</h1>
      {items.length === 0 ? (
        <div className="mt-6">
          <p className="text-muted-foreground">Seu carrinho está vazio.</p>
          <Button asChild className="mt-4"><Link href="/produtos">Ver produtos</Link></Button>
        </div>
      ) : (
        <>
          <div className="mt-6">{items.map((i) => <CartItem key={i.id} item={i} />)}</div>
          <div className="mt-6 space-y-3">
            <div className="flex justify-between text-sm"><span>Total de unidades</span><strong>{total}</strong></div>
            <MinimumOrderAlert total={total} />
            <WhatsAppCheckoutButton />
          </div>
        </>
      )}
    </div>
  );
}