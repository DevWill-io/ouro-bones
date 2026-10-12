import { HatQuiz } from '@/components/tools/HatQuiz';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata = { title: 'Qual boné ideal?' };

export default function Page() {
  return (
    <div className="container py-10 lg:py-16 max-w-2xl">
      <Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Quiz' }]} />
      <h1 className="text-3xl font-bold sm:text-4xl">Qual boné ideal <span className="gold-gradient">para sua marca</span>?</h1>
      <p className="mt-2 text-muted-foreground">Responda 3 perguntas rápidas.</p>
      <div className="mt-8"><HatQuiz /></div>
    </div>
  );
}