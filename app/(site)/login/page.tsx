"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { user, isAdmin, loading: authLoading } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Se já está logado, redireciona
  useEffect(() => {
    if (!authLoading && user) {
      router.replace(isAdmin ? "/dashboard" : "/");
    }
  }, [user, isAdmin, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // o useEffect acima cuida do redirecionamento
    } catch (err: any) {
      const code = err?.code ?? "";
      if (code === "auth/user-not-found") {
        setError("E-mail não cadastrado. Crie uma conta.");
      } else if (code === "auth/wrong-password") {
        setError("Senha incorreta.");
      } else if (code === "auth/invalid-credential") {
        setError("E-mail ou senha incorretos.");
      } else if (code === "auth/too-many-requests") {
        setError("Muitas tentativas. Aguarde alguns minutos.");
      } else {
        setError("Não foi possível entrar. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || user) {
    return (
      <div className="grid min-h-[80vh] place-items-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="grid min-h-[80vh] place-items-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-5 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
      >
        <div className="text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-primary text-2xl text-primary-foreground">
            <LogIn className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-xl font-bold text-foreground">Entrar</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Acesse sua conta para fazer pedidos
          </p>
        </div>

        <label className="block">
          <span className="text-sm font-medium text-foreground">E-mail</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-foreground">Senha</span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        {error && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-950/40 dark:text-red-200"
          >
            {error}
          </p>
        )}

        <Button type="submit" disabled={loading} className="w-full" size="lg">
          {loading ? "Entrando..." : "Entrar"}
        </Button>

        <div className="space-y-2 text-center">
          <p className="text-xs text-muted-foreground">
            Ainda não tem conta?{" "}
            <Link href="/cadastro" className="font-medium text-primary hover:underline">
              Criar agora
            </Link>
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3 w-3" /> Voltar para a loja
          </Link>
        </div>
      </form>
    </div>
  );
}
