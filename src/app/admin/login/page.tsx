import { LoginForm } from '@/components/forms/LoginForm';

export const metadata = { title: 'Login — Admin' };

export default function AdminLogin() {
  return (
    <div className="container max-w-sm py-24">
      <h1 className="text-2xl font-bold text-center">Acesso administrativo</h1>
      <p className="mt-2 text-sm text-center text-muted-foreground">Entre com sua conta Firebase.</p>
      <div className="mt-8"><LoginForm /></div>
    </div>
  );
}