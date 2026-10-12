'use client';
import { useEffect, useState } from 'react';
import { TestimonialForm } from '@/components/admin/TestimonialForm';
import { getCollection, createDocument } from '@/lib/firebase/firestore';
import type { Testimonial } from '@/types/testimonial';
import { toast } from 'sonner';

export default function AdminDepoimentos() {
  const [items, setItems] = useState<Testimonial[]>([]);

  const load = async () => setItems(await getCollection<Testimonial>('testimonials'));
  useEffect(() => { load(); }, []);

  return (
    <div className="container py-10 lg:py-16 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Depoimentos</h1>
      <TestimonialForm onSubmitAction={async (data) => {
        await createDocument('testimonials', data);
        toast.success('Depoimento salvo!');
        load();
      }} />
      <div className="mt-10 space-y-3">
        {items.map((t) => (
          <div key={t.id} className="rounded-lg border p-4">
            <p className="font-medium text-sm">{t.name} {t.company ? `• ${t.company}` : ''}</p>
            <p className="text-sm text-muted-foreground mt-1">{t.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}