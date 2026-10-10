// components/sections/FAQSection.tsx
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    q: "Qual é a quantidade mínima de pedido?",
    a: "Trabalhamos com atacado. O pedido mínimo é de 30 unidades no total, somando todos os modelos escolhidos. O botão de envio do orçamento só é liberado ao atingir essa quantidade.",
  },
  {
    q: "Como funciona o processo de personalização?",
    a: "Você escolhe o modelo, as cores e envia sua logo ou ideia. Nosso time especializado orienta cada etapa e você acompanha o passo a passo da fabricação do seu boné personalizado.",
  },
  {
    q: "Vocês enviam para todo o Brasil?",
    a: "Sim! Enviamos para todo o Brasil e oferecemos Frete Grátis em condições especiais para determinados pedidos.",
  },
  {
    q: "Qual é a qualidade dos bonés?",
    a: "Utilizamos apenas materiais selecionados com a melhor qualidade do mercado. Nossos bonés possuem altíssimo padrão de qualidade e fabricação, garantindo durabilidade e conforto para quem usa.",
  },
  {
    q: "Como envio meu pedido?",
    a: "Após montar o carrinho com no mínimo 30 unidades, você clica em 'Enviar Pedido' e o sistema gera automaticamente uma mensagem estruturada via WhatsApp com todos os itens, quantidades e observações — direto para nossa equipe de vendas.",
  },
  {
    q: "Vocês possuem programa de fidelidade?",
    a: "Sim! Contamos com um programa de fidelização do cliente, com benefícios exclusivos para quem compra recorrentemente com a Ouro Bonés.",
  },
  {
    q: "Como funciona o atendimento?",
    a: "Nosso atendimento é rápido, especializado e totalmente disponível para tirar dúvidas antes, durante e depois da produção do seu pedido.",
  },
  {
    q: "Posso personalizar o boné do meu jeito?",
    a: "Com certeza! O boné é personalizado totalmente do seu jeito — cores, tecidos, formatos, bordados e aplicações, tudo alinhado à identidade da sua marca.",
  },
] as const;

export function FAQSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="w-full bg-background py-14 sm:py-16 lg:py-24"
    >
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          <span className="inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Perguntas Frequentes
          </span>
          <h2
            id="faq-title"
            className="mt-4 text-2xl font-bold leading-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            Tire suas dúvidas antes de pedir
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Tudo o que você precisa saber sobre o atacado Ouro Bonés.
          </p>
        </header>

        <Accordion
          type="single"
          collapsible
          className="mt-8 w-full rounded-2xl border border-border bg-card px-4 shadow-sm sm:mt-10 sm:px-6"
        >
          {FAQ_ITEMS.map((item, idx) => (
            <AccordionItem
              key={item.q}
              value={`item-${idx}`}
              className="border-border last:border-b-0"
            >
              <AccordionTrigger
                className={[
                  "w-full text-left",
                  "text-sm font-semibold leading-snug text-foreground sm:text-base",
                  "py-4 sm:py-5",
                  "hover:text-primary hover:no-underline",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  "min-h-[44px]", // alvo de toque mínimo
                ].join(" ")}
              >
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground sm:pb-5 sm:text-[0.95rem]">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}