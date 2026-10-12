import { NewsletterForm } from '@/components/forms/NewsletterForm';

export function NewsletterSection() {
  return (
    <section className="py-16 lg:py-20 bg-muted/40">
      <div className="container max-w-2xl text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">Novidades e promoções no seu e-mail</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Cadastre-se e receba lançamentos, dicas e condições especiais.
        </p>
        <div className="mt-6">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}