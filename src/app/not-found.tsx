import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center py-24 text-center">
      <p className="text-6xl font-extrabold gold-gradient">404</p>
      <h1 className="mt-4 text-2xl font-bold">Página não encontrada</h1>
      <p className="mt-2 text-muted-foreground">O conteúdo que você procura pode ter sido movido.</p>
      <Button asChild className="mt-6"><Link href="/">Voltar para o início</Link></Button>
    </div>
  );
}