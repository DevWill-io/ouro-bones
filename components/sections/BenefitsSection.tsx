// components/sections/BenefitsSection.tsx
import {
  Headset, Award, Gem, Truck, Paintbrush, ClipboardList, Gift,
} from "lucide-react";

const BENEFITS = [
  { icon: Headset,       title: "Atendimento rápido e especializado", text: "Totalmente disponível para você antes, durante e depois da produção." },
  { icon: Award,         title: "Altíssimo padrão de qualidade",       text: "Fabricação rigorosa que garante durabilidade e acabamento premium." },
  { icon: Gem,           title: "Materiais selecionados",              text: "Só trabalhamos com os melhores tecidos e insumos do mercado." },
  { icon: Truck,         title: "Enviamos para todo o Brasil",         text: "Frete Grátis disponível em condições especiais para o seu pedido." },
  { icon: Paintbrush,    title: "Personalização do seu jeito",         text: "Cores, formatos, bordados e aplicações alinhados à sua marca." },
  { icon: ClipboardList, title: "Acompanhe passo a passo",             text: "Você acompanha cada etapa da fabricação do seu boné personalizado." },
  { icon: Gift,          title: "Programa de fidelização",             text: "Benefícios exclusivos para clientes recorrentes Ouro Bonés." },
] as const;

export function BenefitsSection() {
  return (
    <section
      id="diferenciais"
      aria-labelledby="benefits-title"
      className="w-full bg-secondary/40 dark:bg-card/40 py-14 sm:py-16 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Nosso Diferencial
          </span>
          <h2
            id="benefits-title"
            className="mt-4 text-2xl font-bold leading-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            Por que escolher a <span className="text-primary">Ouro Bonés</span>?
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base lg:text-lg">
            Qualidade, agilidade e personalização de verdade para a sua marca.
          </p>
        </div>

        {/* Grid: 1 → 2 → 3 → 4 colunas */}
        <ul
          role="list"
          className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4"
        >
          {BENEFITS.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              className={[
                "group relative flex flex-col gap-3 rounded-2xl border border-border",
                "bg-card p-5 sm:p-6",
                "shadow-sm transition-all duration-300",
                "hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10",
                // último card ocupa 2 cols no lg se sobrar espaço (opcional)
                i === BENEFITS.length - 1 ? "lg:col-span-1 xl:col-span-1" : "",
              ].join(" ")}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-base font-semibold leading-snug text-foreground sm:text-lg">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                {text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}