'use client';
import { Button } from '@/components/ui/button';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container py-24 text-center">
      <h1 className="text-2xl font-bold">Algo deu errado</h1>
      <p className="mt-2 text-muted-foreground">Tente novamente em instantes.</p>
      <Button onClick={reset} className="mt-6">Tentar novamente</Button>
    </div>
  );
}