import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { buildSimpleWhatsAppUrl } from '@/lib/whatsapp';

export function CTASection() {
  return (
    <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
      <div className="container max-w-3xl text-center">
        <h2 className="text-2xl font-extrabold sm:text-3xl lg:text-4xl">
          Pronto para vestir sua marca com a Ouro Bonés?
        </h2>
        <p className="mt-4 opacity-90">
          Monte seu pedido a partir de 30 unidades e envie o orçamento pelo WhatsApp em segundos.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" variant="outline" className="bg-background text-foreground hover:bg-background/90">
            <a href="/produtos">Ver catálogo</a>
          </Button>
          <Button asChild size="lg" variant="whatsapp">
            <a href={buildSimpleWhatsAppUrl('Olá! Quero um orçamento de bonés personalizados.')} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" /> Falar com especialista
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}