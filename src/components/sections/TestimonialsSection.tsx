'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Star } from 'lucide-react';
import { useTestimonials } from '@/hooks/useTestimonials';

export function TestimonialsSection() {
  const { testimonials, loading } = useTestimonials();

  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
            Quem confia na <span className="gold-gradient">Ouro Bonés</span>
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6 space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))
            : testimonials.slice(0, 6).map((t) => (
                <Card key={t.id}>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex" aria-label={`Avaliação ${t.rating} de 5`}>
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
                    <p className="text-sm text-pretty">"{t.content}"</p>
                    <div className="text-xs text-muted-foreground">
                      <p className="font-semibold text-foreground">{t.name}</p>
                      {t.role && t.company && <p>{t.role} • {t.company}</p>}
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </section>
  );
}