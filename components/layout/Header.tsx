"use client";
import Link from "next/link";
import {
  ShoppingCart,
  LogIn,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useCartStore } from "@/lib/zustand/useCartStore";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "@/components/providers/ThemeToggle";
import { Button } from "@/components/ui/button";

const NAV = [
  { label: "Por que Ouro?", href: "#porque" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Modelos", href: "#produtos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

export function Header() {
  const open = useCartStore((s) => s.open);
  const items = useCartStore((s) => s.items);
  const count = items.reduce((a, i) => a + i.quantity, 0);
  const { user, isAdmin, loading } = useAuthContext();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Erro ao sair:", err);
    } finally {
      // Força recarregar a página e limpar estado em memória
      window.location.replace("/");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-base font-bold sm:text-lg">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            🧢
          </span>
          <span className="hidden sm:inline">
            Ouro <span className="text-primary">Bonés</span>
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Ações */}
        <div className="flex items-center gap-1">
          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            aria-label={`Abrir carrinho — ${count} itens`}
            onClick={open}
            className="relative h-11 w-11"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </Button>

          {/* Botão de usuário dinâmico */}
          {loading ? (
            <div className="h-11 w-11" />
          ) : user ? (
            <div className="flex items-center gap-1">
              {isAdmin && (
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="hidden h-11 w-11 sm:inline-flex"
                  aria-label="Painel administrativo"
                  title="Painel administrativo"
                >
                  <Link href="/dashboard">
                    <LayoutDashboard className="h-5 w-5" />
                  </Link>
                </Button>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11"
                aria-label="Sair da conta"
                title="Sair"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="h-11 w-11"
              aria-label="Entrar"
              title="Entrar"
            >
              <Link href="/login">
                <LogIn className="h-5 w-5" />
              </Link>
            </Button>
          )}

          {/* Menu mobile (recebe onLogout para tratar o item "Sair") */}
          <MobileMenu
            nav={[
              ...NAV,
              ...(user
                ? [
                    ...(isAdmin ? [{ label: "Painel Admin", href: "/dashboard" }] : []),
                    { label: "Sair", href: "#logout" },
                  ]
                : [{ label: "Entrar", href: "/login" }]),
            ]}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </header>
  );
}
