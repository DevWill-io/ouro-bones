'use client';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { toast } from 'sonner';

export function WhatsAppCheckoutButton() {
  const { items, canCheckout } = useCart();

  const handleClick = () => {
    const url = buildWhatsAppUrl(items);
    if (!url) {
      toast.error('Adicione pelo menos 30 unidades para enviar o pedido.');
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Button
      variant="whatsapp"
      size="lg"
      className="w-full"
      disabled={!canCheckout}
      onClick={handleClick}
      aria-disabled={!canCheckout}
    >
      <MessageCircle className="h-5 w-5" />
      Enviar Pedido no WhatsApp
    </Button>
  );
}