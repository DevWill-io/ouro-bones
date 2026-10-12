'use client';
import { MessageCircle } from 'lucide-react';
import { SITE } from '@/lib/constants';
import { buildSimpleWhatsAppUrl } from '@/lib/whatsapp';

export function WhatsAppFloatButton() {
  const href = buildSimpleWhatsAppUrl('Olá, Ouro Bonés! Gostaria de saber mais sobre os bonés personalizados.');
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transition-transform safe-bottom"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}