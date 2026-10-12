'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const CROWN = ['Preto', 'Branco', 'Vermelho', 'Verde Militar', 'Bege'];
const BRIM = ['Preto', 'Branco', 'Cinza', 'Marrom', 'Azul'];
const HEX: Record<string, string> = {
  Preto: '#111827', Branco: '#F3F4F6', Vermelho: '#DC2626', 'Verde Militar': '#4B5320',
  Bege: '#E5D3B3', Cinza: '#6B7280', Marrom: '#5B3A29', Azul: '#1E3A8A',
};

export function ColorSimulator() {
  const [crown, setCrown] = useState('Preto');
  const [brim, setBrim] = useState('Branco');

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardContent className="p-6 flex flex-col gap-4">
          <div>
            <p className="text-sm font-medium mb-2">Coroa</p>
            <div className="flex flex-wrap gap-2">
              {CROWN.map((c) => (
                <button
                  key={c}
                  onClick={() => setCrown(c)}
                  aria-label={`Coroa ${c}`}
                  className={`h-9 w-9 rounded-full border-2 transition ${crown === c ? 'border-primary' : 'border-input'}`}
                  style={{ background: HEX[c] }}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Aba</p>
            <div className="flex flex-wrap gap-2">
              {BRIM.map((c) => (
                <button
                  key={c}
                  onClick={() => setBrim(c)}
                  aria-label={`Aba ${c}`}
                  className={`h-9 w-9 rounded-full border-2 transition ${brim === c ? 'border-primary' : 'border-input'}`}
                  style={{ background: HEX[c] }}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="relative mx-auto aspect-square max-w-xs">
            <div className="absolute inset-x-[15%] top-[20%] h-[45%] rounded-t-full" style={{ background: HEX[crown] }} />
            <div className="absolute inset-x-[8%] top-[65%] h-[10%] rounded-b-full" style={{ background: HEX[brim] }} />
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Coroa: <strong className="text-foreground">{crown}</strong> • Aba: <strong className="text-foreground">{brim}</strong>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}