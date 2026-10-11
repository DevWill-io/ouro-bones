"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingAdmin, setLoadingAdmin] = useState(true);

  // 1) Ouve mudanças de autenticação
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoadingUser(false);
    });
    return () => unsub();
  }, []);

  // 2) Quando o usuário muda, verifica se ele é admin
  useEffect(() => {
    let cancelled = false;

    if (!user) {
      setIsAdmin(false);
      setLoadingAdmin(false);
      return;
    }

    setLoadingAdmin(true);
    getDoc(doc(db, "admins", user.uid))
      .then((snap) => {
        if (!cancelled) setIsAdmin(snap.exists());
      })
      .catch((err) => {
        console.error("Erro ao checar admin:", err);
        if (!cancelled) setIsAdmin(false);
      })
      .finally(() => {
        if (!cancelled) setLoadingAdmin(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user]);

  return {
    user,
    isAdmin,
    loading: loadingUser || loadingAdmin,
  };
}
