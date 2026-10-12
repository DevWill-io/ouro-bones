'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProductForm } from '@/components/admin/ProductForm';
import { getDocument, updateDocument } from '@/lib/firebase/firestore';
import type { Product } from '@/types/product';
import { toast } from 'sonner';

type StoredProduct = Product & { imagePublicIds?: string[] };

export default function EditarProduto() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<StoredProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setProduct(await getDocument<StoredProduct>('products', id));
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-16">
        <p className="text-muted-foreground">Carregando produto…</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-16">
        <p className="text-muted-foreground">Produto não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="container py-10 lg:py-16 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Editar produto</h1>
      <ProductForm
        defaultValues={product}
        onSubmitAction={async (data) => {
          try {
            const { imagePublicIds, ...rest } = data;
            await updateDocument('products', id, { ...rest, imagePublicIds });
            toast.success('Produto atualizado!');
            router.push('/admin/produtos');
          } catch {
            toast.error('Falha ao atualizar.');
          }
        }}
      />
    </div>
  );
}