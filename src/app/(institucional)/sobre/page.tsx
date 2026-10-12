import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { StatsSection } from '@/components/sections/StatsSection';

export const metadata = { title: 'Sobre nós' };

export default function SobrePage() {
  return (
    <div className="container py-10 lg:py-16 max-w-4xl">
      <Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Sobre' }]} />
      <h1 className="text-3xl font-bold sm:text-4xl">Nossa <span className="gold-gradient">história</span></h1>
      <p className="mt-4 text-muted-foreground">
        A Ouro Bonés nasceu com um propósito simples: ajudar marcas a serem lembradas. Começamos como uma pequena oficina e, ao longo de mais de uma década, nos tornamos referência em bonés personalizados no atacado, atendendo centenas de empresas em todo o Brasil.
      </p>

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        {[
          { t: 'Missão', d: 'Produzir bonés de altíssima qualidade que reforcem a identidade e presença das marcas.' },
          { t: 'Visão', d: 'Ser a referência nacional em bonés personalizados para o mercado B2B.' },
          { t: 'Valores', d: 'Qualidade, transparência, atendimento próximo e compromisso com prazos.' },
        ].map((b) => (
          <div key={b.t} className="rounded-lg border p-6">
            <h2 className="font-bold text-primary">{b.t}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Linha do tempo</h2>
        <ol className="mt-6 space-y-6 border-l pl-6">
          {[
            { y: '2012', d: 'Nasce a Ouro Bonés em São Paulo.' },
            { y: '2016', d: 'Primeiros clientes corporativos em escala.' },
            { y: '2020', d: 'Expansão para todo o Brasil com frete próprio.' },
            { y: '2024', d: 'Plataforma online com orçamento automático via WhatsApp.' },
          ].map((e) => (
            <li key={e.y} className="relative">
              <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-primary" />
              <p className="text-sm font-bold text-primary">{e.y}</p>
              <p className="text-sm text-muted-foreground">{e.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Nossa equipe</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border p-6 text-center">
              <div className="mx-auto h-20 w-20 rounded-full bg-primary/20" />
              <p className="mt-3 font-semibold">Membro {i}</p>
              <p className="text-sm text-muted-foreground">Time Ouro Bonés</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-16">
        <StatsSection />
      </div>
    </div>
  );
}