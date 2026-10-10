"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createProduct, updateProduct } from "@/lib/firestore/products";
import { uploadProductImage } from "@/lib/firebase/upload";
import type { Product } from "@/types";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  product: Product | null;
  onSaved: () => void;
};

const EMPTY = {
  name: "",
  description: "",
  imageUrl: "",
  wholesalePrice: 0,
  variants: "",
  active: true,
};

export function ProductFormDialog({ open, onOpenChange, product, onSaved }: Props) {
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        wholesalePrice: product.wholesalePrice,
        variants: product.variants.join(", "),
        active: product.active,
      });
    } else {
      setForm(EMPTY);
    }
  }, [product, open]);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadProductImage(file, product?.id);
      setForm((f) => ({ ...f, imageUrl: url }));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      imageUrl: form.imageUrl.trim(),
      wholesalePrice: Number(form.wholesalePrice) || 0,
      variants: form.variants.split(",").map((v) => v.trim()).filter(Boolean),
      active: form.active,
    };

    try {
      if (product) await updateProduct(product.id, payload);
      else await createProduct(payload);
      onOpenChange(false);
      onSaved();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] w-[95%] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{product ? "Editar produto" : "Novo produto"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Nome</span>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Descrição</span>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Imagem</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
              className="mt-1 block w-full text-sm"
            />
            {uploading && <p className="mt-1 text-xs text-muted-foreground">Enviando…</p>}
            {form.imageUrl && (
              <p className="mt-1 truncate text-xs text-muted-foreground">{form.imageUrl}</p>
            )}
          </label>

          <label className="block">
            <span className="text-sm font-medium">Preço unitário (atacado)</span>
            <input
              type="number"
              step="0.01"
              min="0"
              required
              value={form.wholesalePrice}
              onChange={(e) => setForm({ ...form, wholesalePrice: Number(e.target.value) })}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Variações (separadas por vírgula)</span>
            <input
              required
              placeholder="Preto, Branco, Azul Marinho"
              value={form.variants}
              onChange={(e) => setForm({ ...form, variants: e.target.value })}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
            />
            <span className="text-sm">Produto ativo na loja</span>
          </label>

          <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={saving || uploading}>
              {saving ? "Salvando…" : "Salvar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}