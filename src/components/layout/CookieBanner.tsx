'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'ouro-bones-cookie-consent';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  };

  if (!visible) return null;
  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur p-4 safe-bottom"
    >
      <div className="container flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted-foreground">
          Usamos cookies para melhorar sua experiência. Ao continuar, você concorda com nossa{' '}
          <Link href="/privacidade" className="text-primary underline">Política de Privacidade</Link>.
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setVisible(false)}>Agora não</Button>
          <Button size="sm" onClick={accept}>Aceitar</Button>
        </div>
      </div>
    </div>
  );
}