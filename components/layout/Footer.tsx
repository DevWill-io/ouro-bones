import Link from "next/link";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 text-lg font-bold">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
                🧢
              </span>
              Ouro <span className="text-primary">Bonés</span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Bonés personalizados de altíssima qualidade. Atacado a partir de 30 unidades,
              envio para todo o Brasil e Frete Grátis em condições especiais.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Navegação</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link href="#porque" className="hover:text-primary">Por que Ouro?</Link></li>
              <li><Link href="#diferenciais" className="hover:text-primary">Diferenciais</Link></li>
              <li><Link href="#produtos" className="hover:text-primary">Modelos</Link></li>
              <li><Link href="#faq" className="hover:text-primary">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Contato</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-primary" />
                <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="h-4 w-4 text-primary" />
                <span>@ourobones</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>contato@ourobones.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Ouro Bonés. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}