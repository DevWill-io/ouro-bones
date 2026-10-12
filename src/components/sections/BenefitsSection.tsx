import { benefits } from '@/data/benefits';
import { Card, CardContent } from '@/components/ui/card';

export function BenefitsSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
            Nosso <span className="gold-gradient">Diferencial</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Sete motivos pelos quais marcas escolhem a Ouro Bonés.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <Card key={i} className="border-primary/20 hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <Icon className="h-7 w-7 text-primary" aria-hidden />
                  <p className="mt-4 text-sm font-medium leading-relaxed">{b.text}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}