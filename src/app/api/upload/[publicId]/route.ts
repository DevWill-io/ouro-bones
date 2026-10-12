import { NextResponse } from 'next/server';
import { deleteImage } from '@/lib/cloudinary';

export const runtime = 'nodejs';

/**
 * DELETE /api/upload/:publicId
 * Remove uma imagem do Cloudinary pelo publicId.
 * O publicId pode conter "/" (ex.: "ouro-bones/products/abc123"),
 * por isso usamos encodeURIComponent no client ao chamar.
 */
export async function DELETE(
  _request: Request,
  { params }: { params: { publicId: string } }
) {
  try {
    const publicId = decodeURIComponent(params.publicId);
    await deleteImage(publicId);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao remover';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}