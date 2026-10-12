'use client';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const list = images.length ? images : [''];

  return (
    <div>
      <div className="relative aspect-square rounded-lg overflow-hidden bg-muted/40 border">
        {list[active] ? (
          <Image src={list[active]} alt={name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
        ) : (
          <div className="h-full w-full grid place-items-center text-sm text-muted-foreground">Sem imagem</div>
        )}
      </div>
      {list.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {list.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Ver imagem ${i + 1}`}
              className={cn('relative aspect-square rounded-md overflow-hidden border', active === i ? 'border-primary' : 'border-input')}
            >
              {src ? <Image src={src} alt="" fill sizes="120px" className="object-cover" /> : null}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}