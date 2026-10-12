import { MIN_ORDER, SITE } from '@/lib/constants';
import type { CartItem } from '@/types/cart';

/**
 * Gera a mensagem estruturada para o WhatsApp.
 * Formato definido no prompt mestre — NÃO alterar sem revisar o layout.
 */
export function buildOrderMessage(items: CartItem[]): string {
  const total = items.reduce((sum, i) => sum + i.quantity, 0);

  const lines: string[] = [
    'Olá, Ouro Bonés! 👋',
    '',
    'Gostaria de solicitar um orçamento:',
    '',
    '📦 *ITENS DO PEDIDO*',
    '',
  ];

  items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.name}`);
    lines.push(`   • Quantidade: ${item.quantity}`);
    if (item.color) lines.push(`   • Cor: ${item.color}`);
    if (item.notes) lines.push(`   • Observação: ${item.notes}`);
    lines.push('');
  });

  lines.push('━━━━━━━━━━━━━━━');
  lines.push(`🔢 *TOTAL DE UNIDADES:* ${total}`);
  lines.push('━━━━━━━━━━━━━━━');
  lines.push('');
  lines.push('Aguardo o retorno com o orçamento. Obrigado!');

  return lines.join('\n');
}

/**
 * Monta URL wa.me com a mensagem pré-formatada.
 * Nunca retorna link se total < MIN_ORDER.
 */
export function buildWhatsAppUrl(items: CartItem[]): string | null {
  const total = items.reduce((sum, i) => sum + i.quantity, 0);
  if (total < MIN_ORDER) return null;

  const message = buildOrderMessage(items);
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function buildSimpleWhatsAppUrl(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}