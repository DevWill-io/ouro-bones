'use client';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '@/types/cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/stores/cartStore';

export function CartItem({ item }: { item: CartItemType }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const updateNotes = useCartStore((s) => s.updateNotes);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="flex gap-3 py-4 border-b last:border-0">
      <div className="relative h-20 w-20 shrink-0 rounded-md overflow-hidden bg-muted/40">
        {item.image ? <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" /> : null}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{item.name}</p>
            <p className="text-xs text-muted-foreground">Cor: {item.color}</p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            aria-label={`Remover ${item.name}`}
            onClick={() => removeItem(item.id)}
            className="h-8 w-8 shrink-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Diminuir quantidade">
            <Minus className="h-3 w-3" />
          </Button>
          <Input
            type="number"
            inputMode="numeric"
            min={1}
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, Number(e.target.value) || 1)}
            className="h-8 w-16 text-center"
            aria-label="Quantidade"
          />
          <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Aumentar quantidade">
            <Plus className="h-3 w-3" />
          </Button>
        </div>

        <Input
          placeholder="Observação (ex: logo bordada)"
          value={item.notes ?? ''}
          onChange={(e) => updateNotes(item.id, e.target.value)}
          className="mt-2 h-8 text-xs"
        />
      </div>
    </div>
  );
}