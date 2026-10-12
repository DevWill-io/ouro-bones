'use client';
import { useEffect } from 'react';
import { onAuthChange } from '@/lib/firebase/auth';
import { useAuthStore } from '@/stores/authStore';

export function useAuth() {
  const { user, loading, setUser } = useAuthStore();
  useEffect(() => {
    const unsub = onAuthChange((fbUser) => {
      setUser(fbUser ? { uid: fbUser.uid, email: fbUser.email, displayName: fbUser.displayName } : null);
    });
    return () => unsub();
  }, [setUser]);
  return { user, loading };
}