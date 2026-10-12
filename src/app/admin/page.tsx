'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { logout } from '@/lib/firebase/auth';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  return (
    <div className="container py-10 lg:py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Painel administrativo</h1>
        <Button variant="outline" onClick={async () => { await logout(); router.replace('/admin/login'); }}>Sair</Button>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { href: '/admin/produtos', label: 'Produtos' },
          { href: '/admin/leads', label: 'Leads' },
          { href: '/admin/depoimentos', label: 'Depoimentos' },
        ].map((c) => (
          <Card key={c.href} className="hover:border-primary transition">
            <CardContent className="p-6">
              <Link href={c.href} className="font-semibold hover:text-primary">{c.label}</Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}