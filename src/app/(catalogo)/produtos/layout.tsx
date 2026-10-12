import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Produtos',
  description: 'Catálogo completo de bonés personalizados no atacado para sua marca.',
};

export default function ProdutosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}