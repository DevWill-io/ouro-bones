'use client';
import { SORT_OPTIONS } from '@/lib/constants';

interface Props {
  categories: string[];
  category: string;
  setCategory: (c: string) => void;
  sort: 'featured' | 'name-asc' | 'name-desc';
  setSort: (s: 'featured' | 'name-asc' | 'name-desc') => void;
}

export function ProductFilters({ categories, category, setCategory, sort, setSort }: Props) {
  return (
    <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCategory('all')}
          className={`rounded-full px-3 py-1 text-sm border transition-colors ${category === 'all' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:bg-accent'}`}
        >
          Todas
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full px-3 py-1 text-sm border transition-colors ${category === c ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:bg-accent'}`}
          >
            {c}
          </button>
        ))}
      </div>

      <select
        aria-label="Ordenar produtos"
        value={sort}
        onChange={(e) => setSort(e.target.value as typeof sort)}
        className="h-10 rounded-md border border-input bg-background px-3 text-sm"
      >
        {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}