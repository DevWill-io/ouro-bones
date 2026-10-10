import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* glow decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,theme(colors.primary/20),transparent_55%)]"
      />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
        {/* Texto */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Atacado • Mínimo 30 unidades
          </span>

          <h1 className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-5xl xl:text-6xl">
            Bonés personalizados que fazem sua marca{" "}
            <span className="text-primary">ser lembrada</span>.
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:mx-0 lg:text-lg">
            Qualidade premium, materiais selecionados e personalização total.
            Você acompanha cada etapa da fabricação — e a gente envia para todo o Brasil.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="#produtos">
                Ver modelos <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
              </a>
            </Button>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6 text-center lg:text-left">
            <div>
              <dt className="text-xs uppercase text-muted-foreground">Atacado</dt>
              <dd className="text-lg font-bold text-foreground">30+ un.</dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-muted-foreground">Envio</dt>
              <dd className="text-lg font-bold text-foreground">Brasil</dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-muted-foreground">Padrão</dt>
              <dd className="text-lg font-bold text-foreground">Premium</dd>
            </div>
          </dl>
        </div>

        {/* Imagem */}
        <div className="relative order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-secondary shadow-2xl shadow-primary/10 sm:aspect-[5/6]">
            <Image
              src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=80"
              alt="Boné personalizado Ouro Bonés"
              fill
              priority
              sizes="(max-width: 768px) 90vw, (max-width: 1024px) 60vw, 45vw"
              className="object-cover"
            />
          </div>

          {/* badge flutuante */}
          <div className="absolute -bottom-4 left-4 hidden rounded-2xl border border-border bg-card px-4 py-3 shadow-lg sm:block">
            <p className="text-xs text-muted-foreground">Frete Grátis</p>
            <p className="text-sm font-bold text-foreground">Em pedidos especiais</p>
          </div>
        </div>
      </div>
    </section>
  );
}