import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
      <span className="text-5xl">🧢</span>
      <h1 className="mt-4 text-2xl font-bold sm:text-3xl">Página não encontrada</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        O modelo que você procura pode ter sido removido ou nunca existiu.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Voltar para a loja</Link>
      </Button>
    </div>
  );
}