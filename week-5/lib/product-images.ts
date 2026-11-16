import 'server-only';

import { createServerSupabaseClient } from '@/lib/supabase/server';

const BUCKET = 'product-images';
const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

function extensionFor(file: File) {
  if (file.type === 'image/png') return 'png';
  if (file.type === 'image/webp') return 'webp';
  return 'jpg';
}

export function validateProductImage(file: File) {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error('Gebruik een JPEG-, PNG- of WebP-afbeelding.');
  }

  if (file.size === 0 || file.size > MAX_SIZE) {
    throw new Error(
      'De afbeelding moet groter dan 0 bytes en maximaal 5 MB zijn.',
    );
  }
}

export async function uploadProductImage(file: File) {
  validateProductImage(file);

  const supabase = await createServerSupabaseClient();
  const path = `products/${crypto.randomUUID()}.${extensionFor(file)}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
    cacheControl: '3600',
    upsert: false,
  });

  if (error) {
    throw new Error(`Upload mislukt:${error.message}`);
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);

  return {
    path,
    publicUrl: data.publicUrl,
  };
}

export async function deleteProductImage(imageUrl: string | null) {
  if (!imageUrl) return;

  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const markerIndex = imageUrl.indexOf(marker);

  // Een bestaande afbeelding van bijvoorbeeld Fake Store API of Large
  // staat niet in onze Storage-bucket en mag dus niet worden verwijderd.
  if (markerIndex === -1) return;

  const path = decodeURIComponent(
    imageUrl.slice(markerIndex + marker.length).split('?')[0],
  );

  if (!path) return;

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.storage.from(BUCKET).remove([path]);

  if (error) {
    console.error('Storage cleanup mislukt:', error.message);
  }
}
