'use client';
import { useEffect, useState } from 'react';
import { getCollection } from '@/lib/firebase/firestore';
import { seedTestimonials } from '@/data/testimonials';
import type { Testimonial } from '@/types/testimonial';

/**
 * Busca depoimentos publicados no Firestore.
 * Fallback para o seed local quando vazio / offline.
 */
export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await getCollection<Testimonial>('testimonials');
        if (cancelled) return;
        const published = data.filter((t) => t.published !== false);
        setTestimonials(published.length > 0 ? published : (seedTestimonials as Testimonial[]));
      } catch (err) {
        if (cancelled) return;
        console.warn('[useTestimonials] Firestore indisponível, usando seed local.', err);
        setTestimonials(seedTestimonials as Testimonial[]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  return { testimonials, loading };
}