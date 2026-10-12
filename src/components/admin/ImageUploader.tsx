'use client';
import { useState, useCallback } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export interface UploadedImage {
  url: string;
  publicId: string;
}

interface Props {
  value: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
  max?: number;
}

export function ImageUploader({ value, onChange, max = 5 }: Props) {
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const list = Array.from(files);
      const remaining = max - value.length;
      if (remaining <= 0) {
        toast.error(`Máximo de ${max} imagens.`);
        return;
      }

      setUploading(true);
      const uploaded: UploadedImage[] = [];

      for (const file of list.slice(0, remaining)) {
        try {
          const fd = new FormData();
          fd.append('file', file);
          const res = await fetch('/api/upload', { method: 'POST', body: fd });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error ?? 'Falha no upload');
          uploaded.push({ url: data.url, publicId: data.publicId });
        } catch (err) {
          toast.error(
            `${file.name}: ${err instanceof Error ? err.message : 'erro'}`
          );
        }
      }

      if (uploaded.length > 0) {
        onChange([...value, ...uploaded]);
        toast.success(`${uploaded.length} imagem(ns) enviada(s)!`);
      }
      setUploading(false);
    },
    [value, onChange, max]
  );

  const remove = async (publicId: string) => {
    try {
      await fetch(`/api/upload/${encodeURIComponent(publicId)}`, { method: 'DELETE' });
    } catch {
      // se falhar no Cloudinary, ainda removemos da UI
    }
    onChange(value.filter((i) => i.publicId !== publicId));
  };

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center transition-colors',
          dragging ? 'border-primary bg-primary/5' : 'border-input'
        )}
      >
        <input
          id="image-upload-input"
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          disabled={uploading}
        />
        <label
          htmlFor="image-upload-input"
          className="cursor-pointer inline-flex flex-col items-center gap-2"
        >
          {uploading ? (
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          ) : (
            <Upload className="h-6 w-6 text-primary" />
          )}
          <span className="text-sm font-medium">
            {uploading ? 'Enviando...' : 'Clique ou arraste imagens aqui'}
          </span>
          <span className="text-xs text-muted-foreground">
            JPG, PNG, WebP ou AVIF • máx. 5MB • até {max} imagens
          </span>
        </label>
      </div>

      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {value.map((img) => (
            <div key={img.publicId} className="relative aspect-square rounded-md overflow-hidden border group">
              <Image src={img.url} alt="" fill sizes="120px" className="object-cover" />
              <button
                type="button"
                onClick={() => remove(img.publicId)}
                aria-label="Remover imagem"
                className="absolute top-1 right-1 rounded-full bg-black/70 p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}