'use client';
import { useRouter } from 'next/navigation';
import { ProductForm } from '@/components/admin/ProductForm';
import { createDocument } from '@/lib/firebase/firestore';
import { toast } from 'sonner';

export default function NovoProduto() {
  const router = useRouter();

  return (
    <div className="container py-10 lg:py-16 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Novo produto</h1>
      <ProductForm
        onSubmitAction={async (data) => {
          try {
            const { imagePublicIds, ...rest } = data;
            await createDocument('products', { ...rest, imagePublicIds });
            toast.success('Produto criado!');
            router.push('/admin/produtos');
          } catch {
            toast.error('Falha ao criar. Verifique o console do Firebase.');
          }
        }}
      />
    </div>
  );
}