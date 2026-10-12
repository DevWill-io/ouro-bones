'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLogin = pathname === '/admin/login';

  useEffect(() => {
    if (!loading && !user && !isLogin) router.replace('/admin/login');
  }, [user, loading, isLogin, router]);

  if (isLogin) return <>{children}</>;
  if (loading) return <div className="container py-16"><Skeleton className="h-10 w-40" /><Skeleton className="mt-4 h-40 w-full" /></div>;
  if (!user) return null;
  return <>{children}</>;
}