"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { upsertUser } from "@/lib/firestore/users";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingAdmin, setLoadingAdmin] = useState(true);

  // 1) Ouve autenticação
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoadingUser(false);
    });
    return () => unsub();
  }, []);

  // 2) Checa admin — INDEPENDENTE do upsertUser
  useEffect(() => {
    let cancelled = false;

    if (!user) {
      setIsAdmin(false);
      setLoadingAdmin(false);
      return;
    }

    setLoadingAdmin(true);

    (async () => {
      try {
        console.log("[Auth] Checando admin para UID:", user.uid);
        const snap = await getDoc(doc(db, "admins", user.uid));
        console.log("[Auth] Doc admins existe?", snap.exists());
        if (snap.exists()) console.log("[Auth] Dados:", snap.data());
        if (!cancelled) setIsAdmin(snap.exists());
      } catch (err: any) {
        console.error("[Auth] ❌ Erro ao checar admin:", err?.code, err?.message);
        if (!cancelled) setIsAdmin(false);
      } finally {
        if (!cancelled) setLoadingAdmin(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user]);

  // 3) Sincroniza user na coleção users — best-effort, nunca bloqueia
  useEffect(() => {
    if (!user) return;
    upsertUser(user).catch((err) => {
      console.warn("[Auth] ⚠️ Falha ao sincronizar users (não crítico):", err?.code);
    });
  }, [user]);

  return {
    user,
    isAdmin,
    loading: loadingUser || loadingAdmin,
  };
}
