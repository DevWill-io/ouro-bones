
"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { Loader2 } from "lucide-react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";

  useEffect(() => {
    // Só redireciona se NÃO estiver carregando, NÃO tiver usuário E não estiver na página de login
    if (!loading && !user && !isLoginPage) {
      router.replace("/login");
    }
  }, [user, loading, router, isLoginPage]);

  // Se estamos na página de login, deixa renderizar normalmente (sem spinner)
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Enquanto verifica autenticação, mostra spinner
  if (loading || !user) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
