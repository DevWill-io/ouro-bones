'use client';
import { useEffect, useState } from 'react';
import { LeadsTable } from '@/components/admin/LeadsTable';
import { getCollection } from '@/lib/firebase/firestore';
import type { Lead } from '@/types/lead';

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  useEffect(() => { (async () => { setLeads(await getCollection<Lead>('leads')); })(); }, []);
  return (
    <div className="container py-10 lg:py-16">
      <h1 className="text-2xl font-bold mb-6">Leads</h1>
      <LeadsTable leads={leads} />
    </div>
  );
}