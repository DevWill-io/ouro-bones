'use client';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const current = resolvedTheme ?? theme;
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={`Mudar para modo ${current === 'dark' ? 'claro' : 'escuro'}`}
      onClick={() => setTheme(current === 'dark' ? 'light' : 'dark')}
      className="text-foreground"
    >
      {mounted && current === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}