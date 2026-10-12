import { BudgetCalculator } from '@/components/tools/BudgetCalculator';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata = { title: 'Calculadora de orçamento' };

export default function Page() {
  return (
    <div className="container py-10 lg:py-16 max-w-3xl">
      <Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Calculadora' }]} />
      <h1 className="text-3xl font-bold sm:text-4xl">Calculadora de <span className="gold-gradient">orçamento</span></h1>
      <p className="mt-2 text-muted-foreground">Estime o investimento do seu pedido em segundos.</p>
      <div className="mt-8"><BudgetCalculator /></div>
    </div>
  );
}