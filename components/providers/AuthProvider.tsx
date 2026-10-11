"use client";
import { createContext, useContext, type ReactNode } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import type { User } from "firebase/auth";

type AuthCtx = {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
};

const Ctx = createContext<AuthCtx>({ user: null, loading: true, isAdmin: false });

export function AuthProvider({ children }: { children: ReactNode }) {
  const value = useAuth();
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuthContext() {
  return useContext(Ctx);
}
