import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Depoimentos',
  description: 'O que nossos clientes dizem sobre os bonés personalizados da Ouro Bonés.',
};

export default function DepoimentosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}