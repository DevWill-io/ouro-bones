import { MessageCircle, Truck, ShieldCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const WA = "https://wa.me/5511999999999?text=" +
  encodeURIComponent("Olá! Quero um orçamento de bonés personalizados com a Ouro Bonés.");

export function CTASection() {
  return (
    <section
      id="contato"
      className="w-full bg-primary text-primary-foreground"
    >
      <div className="mx-auto w-full max-w-5xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <h2 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
          Pronto para vestir sua marca?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm opacity-90 sm:text-base lg:text-lg">
          Fale agora com nosso time e receba uma proposta personalizada em minutos.
          Atendimento rápido, especializado e totalmente disponível.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4">
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="h-12 w-full max-w-md bg-background text-foreground hover:bg-background/90 sm:w-auto"
          >
            <a href={WA} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" /> Falar com especialista
            </a>
          </Button>

          <ul className="mt-4 grid w-full grid-cols-1 gap-3 text-sm sm:grid-cols-3">
            <li className="flex items-center justify-center gap-2">
              <Truck className="h-4 w-4" /> Frete Grátis*
            </li>
            <li className="flex items-center justify-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Qualidade premium
            </li>
            <li className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4" /> Atendimento ágil
            </li>
          </ul>
          <p className="text-xs opacity-75">*Em condições especiais para pedidos elegíveis</p>
        </div>
      </div>
    </section>
  );
}