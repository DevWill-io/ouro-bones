'use client';
import type { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function ProductTable({ products, onDelete }: { products: Product[]; onDelete?: (id: string) => void }) {
  if (products.length === 0) return <p className="text-sm text-muted-foreground">Nenhum produto cadastrado.</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="border-b">
          <tr className="text-left">
            <th className="py-2 pr-4">Nome</th>
            <th className="py-2 pr-4">Categoria</th>
            <th className="py-2 pr-4">Status</th>
            <th className="py-2 pr-4 text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="py-3 pr-4 font-medium">{p.name}</td>
              <td className="py-3 pr-4 text-muted-foreground">{p.category}</td>
              <td className="py-3 pr-4">
                <Badge variant={p.active ? 'success' : 'secondary'}>{p.active ? 'Ativo' : 'Inativo'}</Badge>
              </td>
              <td className="py-3 pr-4 text-right">
                <Button asChild size="icon" variant="ghost"><Link href={`/admin/produtos/${p.id}`}><Pencil className="h-4 w-4" /></Link></Button>
                {onDelete && (
                  <Button size="icon" variant="ghost" aria-label="Remover" onClick={() => onDelete(p.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}