import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export const metadata = { title: 'Obrigado!' };

export default function ObrigadoPage() {
  return (
    <div className="container py-24 max-w-xl text-center">
      <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
      <h1 className="mt-4 text-3xl font-bold">Recebemos seu contato!</h1>
      <p className="mt-2 text-muted-foreground">Nossa equipe retornará em breve. Enquanto isso, explore o catálogo.</p>
      <Button asChild className="mt-6"><Link href="/produtos">Ver produtos</Link></Button>
    </div>
  );
}