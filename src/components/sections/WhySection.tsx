'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

export function WhySection() {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <section className="py-16 lg:py-24">
      <div ref={ref} className="container max-w-4xl text-center">
        <h2 className="text-2xl font-bold text-balance sm:text-3xl lg:text-4xl">
          Por que produzir seus bonés personalizados com a <span className="gold-gradient">Ouro Bonés</span>?
        </h2>
        <p className="mt-6 text-base text-muted-foreground sm:text-lg text-pretty">
          Criar um boné personalizado para sua marca ou empresa é uma das melhores formas de divulgar seu negócio.
        </p>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg text-pretty">
          Quando você presenteia um cliente com um boné contendo sua logo, você cria uma conexão real. A todo momento ele vai lembrar do seu negócio e te divulgar por onde for. Contando com os bonés de altíssima qualidade que nós proporcionaremos, seu cliente vai usar muito o seu acessório e te indicar para outras pessoas.
        </p>
      </div>
    </section>
  );
}