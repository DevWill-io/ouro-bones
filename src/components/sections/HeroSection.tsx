import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { SITE } from '@/lib/constants';
import { buildSimpleWhatsAppUrl } from '@/lib/whatsapp';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/40">
      <div className="container grid items-center gap-10 py-16 lg:py-24 lg:grid-cols-2">
        <div className="space-y-6 text-center lg:text-left">
          <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Atacado B2B • Pedido mínimo 30 unidades
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Bonés personalizados que fazem sua <span className="gold-gradient">marca ser lembrada</span>
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg max-w-xl mx-auto lg:mx-0 text-pretty">
            Crie bonés sob medida para sua marca ou empresa, com qualidade premium e envio para todo o Brasil.
            Você monta o pedido e finaliza o orçamento direto no WhatsApp.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button asChild size="lg">
              <Link href="/produtos">
                Ver catálogo <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="whatsapp">
              <a href={buildSimpleWhatsAppUrl('Olá! Quero um orçamento de bonés personalizados.')} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>

        <div className="relative aspect-square max-w-lg mx-auto w-full rounded-2xl bg-primary/10 border border-primary/20 overflow-hidden">
          <div className="absolute inset-0 grid place-items-center">
            <div className="h-40 w-40 rounded-full bg-primary/30 blur-3xl" aria-hidden />
          </div>
          <div className="relative z-10 h-full w-full grid place-items-center text-center p-8">
            <div>
              <p className="text-sm font-medium text-primary">Foto do produto / hero</p>
              <p className="mt-1 text-xs text-muted-foreground">Substitua por /images/hero/bones.jpg</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}