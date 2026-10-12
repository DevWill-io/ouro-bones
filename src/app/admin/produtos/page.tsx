'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductTable } from '@/components/admin/ProductTable';
import { getCollection, deleteDocument } from '@/lib/firebase/firestore';
import type { Product } from '@/types/product';
import { seedProducts } from '@/data/products';
import { toast } from 'sonner';

export default function AdminProdutos() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getCollection<Product>('products');
        setItems(data.length ? data : seedProducts);
      } catch {
        setItems(seedProducts);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Remover este produto?')) return;
    try { await deleteDocument('products', id); }
    catch { /* seed local */ }
    setItems((prev) => prev.filter((p) => p.id !== id));
    toast.success('Produto removido.');
  };

  return (
    <div className="container py-10 lg:py-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <Button asChild><Link href="/admin/produtos/novo">Novo produto</Link></Button>
      </div>
      {loading ? <p className="text-muted-foreground">Carregando...</p> : <ProductTable products={items} onDelete={handleDelete} />}
    </div>
  );
}