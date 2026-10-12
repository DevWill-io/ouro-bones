import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

export interface UploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
}

/**
 * Faz upload de uma imagem para o Cloudinary.
 * Aplica transformação: 1200x1200 (fill), qualidade auto, formato auto (WebP/AVIF).
 *
 * ATENÇÃO: só pode ser chamado server-side (API route / server action),
 * porque usa o API_SECRET que NUNCA deve ir para o client.
 */
export async function uploadImage(
  file: File,
  folder = 'ouro-bones/products'
): Promise<UploadResult> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(`Formato inválido: ${file.type}. Aceitos: JPG, PNG, WebP, AVIF.`);
  }
  if (file.size > MAX_BYTES) {
    throw new Error(`Arquivo muito grande. Máximo: 5MB.`);
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: 'image',
          transformation: [
            { width: 1200, height: 1200, crop: 'fill', gravity: 'auto' },
            { quality: 'auto', fetch_format: 'auto' },
          ],
        },
        (error, result) => {
          if (error || !result) {
            reject(error ?? new Error('Upload retornou resultado vazio'));
            return;
          }
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
          });
        }
      )
      .end(buffer);
  });
}

/**
 * Remove uma imagem do Cloudinary pelo publicId.
 * Útil ao deletar um produto ou substituir uma imagem.
 */
export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
}

/**
 * Gera URL otimizada sem precisar fazer upload.
 * Útil para placeholders e imagens já hospedadas no Cloudinary.
 */
export function getOptimizedUrl(publicId: string, width = 800): string {
  return cloudinary.url(publicId, {
    transformation: [
      { width, crop: 'fill', gravity: 'auto' },
      { quality: 'auto', fetch_format: 'auto' },
    ],
    secure: true,
  });
}