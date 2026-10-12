'use client';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { MIN_ORDER } from '@/lib/constants';

export function MinimumOrderAlert({ total }: { total: number }) {
  if (total >= MIN_ORDER) {
    return (
      <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm flex items-start gap-2">
        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
        <span>Você atingiu o mínimo de {MIN_ORDER} unidades! Pode enviar o pedido.</span>
      </div>
    );
  }
  const remaining = MIN_ORDER - total;
  return (
    <div className="rounded-md border border-amber-500/30 bg-amber-500/10 p-3 text-sm flex items-start gap-2">
      <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
      <span>Faltam <strong>{remaining}</strong> {remaining === 1 ? 'unidade' : 'unidades'} para atingir o mínimo de {MIN_ORDER}.</span>
    </div>
  );
}