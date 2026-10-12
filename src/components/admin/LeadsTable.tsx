'use client';
import type { Lead } from '@/types/lead';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const exportCsv = () => {
    const headers = ['Nome', 'E-mail', 'Telefone', 'Empresa', 'Mensagem', 'Origem'];
    const rows = leads.map((l) => [l.name ?? '', l.email, l.phone ?? '', l.company ?? '', l.message ?? '', l.source]);
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ouro-bones-leads-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{leads.length} leads</p>
        <Button size="sm" variant="outline" onClick={exportCsv}><Download className="h-4 w-4" /> Exportar CSV</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr className="text-left">
              <th className="py-2 pr-4">Nome</th>
              <th className="py-2 pr-4">E-mail</th>
              <th className="py-2 pr-4">Origem</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="border-b">
                <td className="py-3 pr-4">{l.name ?? '—'}</td>
                <td className="py-3 pr-4">{l.email}</td>
                <td className="py-3 pr-4 text-muted-foreground">{l.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}