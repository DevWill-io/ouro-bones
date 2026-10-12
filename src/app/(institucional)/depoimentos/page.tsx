'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Star } from 'lucide-react';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { useTestimonials } from '@/hooks/useTestimonials';

export default function DepoimentosPage() {
  const { testimonials, loading } = useTestimonials();

  return (
    <div className="container py-10 lg:py-16">
      <Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Depoimentos' }]} />
      <h1 className="text-3xl font-bold sm:text-4xl">O que nossos clientes dizem</h1>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6 space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))
          : testimonials.map((t) => (
              <Card key={t.id}>
                <CardContent className="p-6 space-y-3">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={
                          i < t.rating
                            ? 'h-4 w-4 fill-primary text-primary'
                            : 'h-4 w-4 text-muted'
                        }
                      />
                    ))}
                  </div>
                  <p className="text-sm">
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-foreground">{t.name}</strong>
                    {t.company ? ` • ${t.company}` : ''}
                  </p>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
}