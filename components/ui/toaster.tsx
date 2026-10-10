// components/ui/toaster.tsx
"use client";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export function Toaster() {
  const { toasts } = useToast();
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4 sm:bottom-4 sm:top-auto sm:items-end"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "pointer-events-auto w-full max-w-sm rounded-lg border border-border bg-card p-4 text-card-foreground shadow-lg animate-pop-in",
            t.className
          )}
        >
          {t.title && <p className="text-sm font-semibold">{t.title}</p>}
          {t.description && (
            <p className="mt-1 text-xs text-muted-foreground">{t.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}