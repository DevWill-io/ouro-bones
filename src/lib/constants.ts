export const MIN_ORDER = 30;

export const SITE = {
  name: 'Ouro Bonés',
  legalName: 'Ouro Bonés LTDA',
  cnpj: '00.000.000/0001-00',
  phone: '+55 (11) 99999-9999',
  email: 'contato@ourobones.com.br',
  address: 'São Paulo — SP, Brasil',
  hours: 'Seg–Sex, 08h–18h',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5511999999999',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ouro-bones.vercel.app',
};

export const NAV_LINKS = [
  { label: 'Início', href: '/' },
  { label: 'Produtos', href: '/produtos' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Guia', href: '/guia/tamanhos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contato', href: '/contato' },
];

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Destaques' },
  { value: 'name-asc', label: 'Nome (A–Z)' },
  { value: 'name-desc', label: 'Nome (Z–A)' },
] as const;