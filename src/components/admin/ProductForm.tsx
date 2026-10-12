'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, type ProductInput } from '@/lib/validators';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ImageUploader, type UploadedImage } from './ImageUploader';
import { slugify } from '@/lib/utils';

interface Props {
  defaultValues?: Partial<ProductInput> & { id?: string; imagePublicIds?: string[] };
  onSubmitAction: (data: ProductInput & { imagePublicIds: string[] }) => Promise<void>;
}

export function ProductForm({ defaultValues, onSubmitAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<UploadedImage[]>(
    (defaultValues?.images ?? []).map((url, i) => ({
      url,
      publicId: defaultValues?.imagePublicIds?.[i] ?? `existing-${i}`,
    }))
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      slug: defaultValues?.slug ?? '',
      description: defaultValues?.description ?? '',
      category: defaultValues?.category ?? '',
      colors: defaultValues?.colors ?? [],
      images: defaultValues?.images ?? [],
      active: defaultValues?.active ?? true,
      featured: defaultValues?.featured ?? false,
    },
  });

  const nameValue = watch('name');

  const submit = async (data: ProductInput) => {
    setLoading(true);
    try {
      const payload: ProductInput & { imagePublicIds: string[] } = {
        ...data,
        slug: data.slug || slugify(data.name),
        images: images.map((i) => i.url),
        imagePublicIds: images.map((i) => i.publicId),
      };
      await onSubmitAction(payload);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Nome*</Label>
          <Input
            id="name"
            {...register('name')}
            onBlur={(e) => {
              if (!watch('slug')) setValue('slug', slugify(e.target.value));
            }}
          />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="slug">Slug*</Label>
          <Input id="slug" placeholder={nameValue ? slugify(nameValue) : 'gerado-automaticamente'} {...register('slug')} />
          {errors.slug && <p className="mt-1 text-xs text-destructive">{errors.slug.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="category">Categoria*</Label>
        <Input id="category" placeholder="Trucker, Dad Hat, Five Panel…" {...register('category')} />
        {errors.category && <p className="mt-1 text-xs text-destructive">{errors.category.message}</p>}
      </div>

      <div>
        <Label htmlFor="description">Descrição*</Label>
        <Textarea id="description" rows={4} {...register('description')} />
        {errors.description && <p className="mt-1 text-xs text-destructive">{errors.description.message}</p>}
      </div>

      <div>
        <Label>Imagens</Label>
        <ImageUploader value={images} onChange={setImages} max={5} />
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register('active')} /> Ativo
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register('featured')} /> Destaque na home
        </label>
      </div>

      <Button type="submit" size="lg" disabled={loading}>
        {loading ? 'Salvando...' : 'Salvar produto'}
      </Button>
    </form>
  );
}