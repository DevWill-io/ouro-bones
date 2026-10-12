import Link from 'next/link';
import { SITE, NAV_LINKS } from '@/lib/constants';
import { Instagram, Facebook, Mail, Phone, MapPin, Lock } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t bg-muted/30 safe-bottom">
      <div className="container py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="inline-block h-7 w-7 rounded-full bg-primary" aria-hidden />
            <span className="gold-gradient">Ouro Bonés</span>
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            Bonés personalizados no atacado para marcas e empresas de todo o Brasil.
          </p>
          <div className="mt-4 flex gap-2">
            <a href="#" aria-label="Instagram" className="p-2 rounded-md hover:bg-accent">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Facebook" className="p-2 rounded-md hover:bg-accent">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Navegação</h3>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-muted-foreground hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Guias</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/guia/tamanhos" className="text-muted-foreground hover:text-primary">Tamanhos</Link></li>
            <li><Link href="/guia/materiais" className="text-muted-foreground hover:text-primary">Materiais</Link></li>
            <li><Link href="/guia/personalizacao" className="text-muted-foreground hover:text-primary">Personalização</Link></li>
            <li><Link href="/guia/glossario" className="text-muted-foreground hover:text-primary">Glossário</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Contato</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0" /> {SITE.phone}</li>
            <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0" /> {SITE.email}</li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /> {SITE.address}</li>
            <li className="text-xs">{SITE.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="container flex flex-col gap-3 py-5 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {year} {SITE.legalName} • CNPJ {SITE.cnpj}</p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacidade" className="hover:text-primary">Privacidade</Link>
            <Link href="/termos" className="hover:text-primary">Termos</Link>
            <Link href="/trocas" className="hover:text-primary">Trocas</Link>

            {/* Acesso ao painel administrativo */}
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 rounded-md border border-input px-2.5 py-1 hover:border-primary hover:text-primary transition-colors"
              aria-label="Acessar painel administrativo"
            >
              <Lock className="h-3 w-3" />
              Painel
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}