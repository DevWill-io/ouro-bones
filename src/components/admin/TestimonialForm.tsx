'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { testimonialSchema, type TestimonialInput } from '@/lib/validators';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function TestimonialForm({ onSubmitAction }: { onSubmitAction: (data: TestimonialInput) => Promise<void> }) {
  const { register, handleSubmit, formState: { errors } } = useForm<TestimonialInput>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: { rating: 5, published: false },
  });

  return (
    <form onSubmit={handleSubmit(onSubmitAction)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input id="name" {...register('name')} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="company">Empresa</Label>
          <Input id="company" {...register('company')} />
        </div>
        <div>
          <Label htmlFor="role">Cargo</Label>
          <Input id="role" {...register('role')} />
        </div>
        <div>
          <Label htmlFor="rating">Avaliação (1–5)</Label>
          <Input id="rating" type="number" min={1} max={5} {...register('rating', { valueAsNumber: true })} />
        </div>
      </div>
      <div>
        <Label htmlFor="content">Depoimento</Label>
        <Textarea id="content" rows={4} {...register('content')} />
      </div>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register('published')} /> Publicar</label>
      <Button type="submit">Salvar depoimento</Button>
    </form>
  );
}