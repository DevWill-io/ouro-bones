'use client';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AddToCartButton } from './AddToCartButton';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden group hover:border-primary transition-colors">
      <Link href={`/produtos/${product.slug}`} className="block">
        <div className="relative aspect-square bg-muted/40">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="h-full w-full grid place-items-center text-xs text-muted-foreground">
              Sem imagem
            </div>
          )}
          <Badge className="absolute top-3 left-3" variant="secondary">{product.category}</Badge>
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/produtos/${product.slug}`}>
          <h3 className="font-semibold hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <AddToCartButton product={product} />
      </CardFooter>
    </Card>
  );
}