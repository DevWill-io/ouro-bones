'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MIN_ORDER } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { buildSimpleWhatsAppUrl } from '@/lib/whatsapp';

const BASE_PRICE = 35; // R$ estimado por boné (base para estimativa)

export function BudgetCalculator() {
  const [qty, setQty] = useState(MIN_ORDER);
  const [embroidery, setEmbroidery] = useState(false);
  const [extras, setExtras] = useState(false);

  const unit = BASE_PRICE + (embroidery ? 5 : 0) + (extras ? 7 : 0);
  const total = unit * qty;

  const sendWhats = () => {
    const msg = `Olá! Fiz uma estimativa no site:\n\n• Quantidade: ${qty}\n• Bordado: ${embroidery ? 'Sim' : 'Não'}\n• Aplicações extras: ${extras ? 'Sim' : 'Não'}\n• Estimativa: R$ ${total.toFixed(2)}\n\nGostaria de um orçamento oficial.`;
    window.open(buildSimpleWhatsAppUrl(msg), '_blank');
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-5">
        <div>
          <Label htmlFor="qty">Quantidade (mín. {MIN_ORDER})</Label>
          <Input id="qty" type="number" min={MIN_ORDER} value={qty} onChange={(e) => setQty(Math.max(MIN_ORDER, Number(e.target.value) || MIN_ORDER))} />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={embroidery} onChange={(e) => setEmbroidery(e.target.checked)} />
          Bordado frontal
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={extras} onChange={(e) => setExtras(e.target.checked)} />
          Aplicações extras (patch, silk, etc.)
        </label>
        <div className="rounded-md border p-4 bg-muted/30">
          <p className="text-sm text-muted-foreground">Estimativa por unidade</p>
          <p className="text-lg font-semibold">R$ {unit.toFixed(2)}</p>
          <p className="mt-2 text-sm text-muted-foreground">Total estimado</p>
          <p className="text-2xl font-bold text-primary">R$ {total.toFixed(2)}</p>
        </div>
        <Button variant="whatsapp" className="w-full" onClick={sendWhats}>Solicitar orçamento oficial</Button>
        <p className="text-xs text-muted-foreground">Valores estimativos. O orçamento final é enviado pela equipe.</p>
      </CardContent>
    </Card>
  );
}