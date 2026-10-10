import { Sparkles } from "lucide-react";

export function WhySection() {
  return (
    <section
      id="porque"
      aria-labelledby="why-title"
      className="w-full bg-background py-14 sm:py-16 lg:py-24"
    >
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Por que Ouro Bonés
          </span>
          <h2
            id="why-title"
            className="mt-4 text-2xl font-bold leading-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            Por que produzir seus bonés personalizados com a Ouro Bonés?
          </h2>
        </div>

        <div className="mt-8 space-y-6 text-center sm:mt-10">
          <p className="text-base font-medium leading-relaxed text-foreground sm:text-lg lg:text-xl">
            &ldquo;Criar um boné personalizado para sua marca ou empresa é uma das
            melhores formas de divulgar seu negócio.&rdquo;
          </p>

          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
            Quando você presenteia um cliente com um boné contendo sua logo, você cria uma
            conexão real. A todo momento ele vai lembrar do seu negócio e te divulgar por onde
            for. Contando com os bonés de altíssima qualidade que nós proporcionaremos, seu
            cliente vai usar muito o seu acessório e te indicar para outras pessoas.
          </p>
        </div>
      </div>
    </section>
  );
}