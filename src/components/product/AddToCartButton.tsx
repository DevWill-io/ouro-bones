'use client';
import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import type { Product } from '@/types/product';

interface Props {
  product: Product;
  color?: string;
  quantity?: number;
  notes?: string;
  className?: string;
}

export function AddToCartButton({ product, color, quantity = 1, notes, className }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    const chosenColor = color ?? product.colors[0] ?? 'Padrão';
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      color: chosenColor,
      quantity,
      notes,
      image: product.images[0],
    });
    toast.success(`${product.name} adicionado ao carrinho`);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Button onClick={handleAdd} className={className} aria-label={`Adicionar ${product.name} ao carrinho`}>
      <ShoppingBag className="h-4 w-4" />
      {added ? 'Adicionado!' : 'Adicionar'}
    </Button>
  );
}