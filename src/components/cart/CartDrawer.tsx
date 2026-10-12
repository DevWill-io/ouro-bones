'use client';
import { useCartStore } from '@/stores/cartStore';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';
import { MinimumOrderAlert } from './MinimumOrderAlert';
import { WhatsAppCheckoutButton } from './WhatsAppCheckoutButton';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const { total } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(o) => !o && close()}>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Seu orçamento</SheetTitle>
          <SheetDescription>
            {items.length === 0 ? 'Carrinho vazio' : `${items.length} ${items.length === 1 ? 'item' : 'itens'}`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto mt-4 -mx-6 px-6">
          {items.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm text-muted-foreground">Seu carrinho está vazio.</p>
              <Button asChild className="mt-4">
                <Link href="/produtos" onClick={close}>Ver produtos</Link>
              </Button>
            </div>
          ) : (
            items.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>

        {items.length > 0 && (
          <div className="mt-4 space-y-3 border-t pt-4">
            <CartSummary />
            <MinimumOrderAlert total={total} />
            <WhatsAppCheckoutButton />
            <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={clear}>
              <Trash2 className="h-4 w-4" /> Limpar carrinho
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}