import { NextResponse } from 'next/server';
import { uploadImage } from '@/lib/cloudinary';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/upload
 * Recebe multipart/form-data com campo "file" (imagem).
 * Retorna { url, publicId, width, height }.
 *
 * Segurança: sem autenticação própria aqui — confie que o Cloudinary
 * rejeita formatos inválidos e aplica o limite de 5MB.
 * Em produção, adicione validação de sessão do admin (ex.: Firebase ID token).
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Arquivo ausente ou inválido.' }, { status: 400 });
    }

    const result = await uploadImage(file);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}