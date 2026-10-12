'use client';
import { useEffect, useRef, useState } from 'react';
import { stats } from '@/data/stats';

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1200;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setCount(Math.floor(progress * value));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return <span ref={ref}>{count.toLocaleString('pt-BR')}{suffix}</span>;
}

export function StatsSection() {
  return (
    <section className="py-16 lg:py-20 border-y bg-muted/20">
      <div className="container grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className="text-center">
            <p className="text-3xl font-extrabold text-primary sm:text-4xl">
              <Counter value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}