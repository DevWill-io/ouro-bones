'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const QUESTIONS = [
  { q: 'Qual o estilo da sua marca?', a: [
    { t: 'Streetwear', v: 'five-panel-verde' },
    { t: 'Corporativo', v: 'trucker-preto' },
    { t: 'Casual', v: 'dad-hat-amarelo' },
  ]},
  { q: 'Prefere aba curva ou reta?', a: [
    { t: 'Curva', v: 'trucker-preto' },
    { t: 'Reta', v: 'aba-reta-branco' },
  ]},
  { q: 'Vai usar em evento ou uniforme?', a: [
    { t: 'Evento', v: 'trucker-vermelho' },
    { t: 'Uniforme', v: 'aba-reta-branco' },
    { t: 'Coleção própria', v: 'bucket-preto' },
  ]},
];

export function HatQuiz() {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  if (result) {
    return (
      <Card>
        <CardContent className="p-8 text-center space-y-4">
          <p className="text-sm text-muted-foreground">Recomendamos para você:</p>
          <p className="text-2xl font-bold gold-gradient">{result}</p>
          <Button onClick={() => { setResult(null); setStep(0); }} variant="outline">Refazer quiz</Button>
        </CardContent>
      </Card>
    );
  }

  const current = QUESTIONS[step];
  return (
    <Card>
      <CardContent className="p-6 space-y-5">
        <p className="text-xs text-muted-foreground">Pergunta {step + 1} de {QUESTIONS.length}</p>
        <h3 className="text-lg font-semibold">{current.q}</h3>
        <div className="flex flex-col gap-2">
          {current.a.map((opt) => (
            <Button
              key={opt.t}
              variant="outline"
              className="justify-start"
              onClick={() => {
                if (step + 1 >= QUESTIONS.length) setResult(opt.v);
                else setStep(step + 1);
              }}
            >
              {opt.t}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}