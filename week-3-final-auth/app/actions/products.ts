'use server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/supabase/auth';
import type { Product } from '@/types/product';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

function readForm(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim();
  const price = Number(formData.get('price'));
  if (!title) throw new Error('Titel is verplicht.');
  if (!Number.isFinite(price) || price < 0) throw new Error('Ongeldige prijs.');

  const optional = (name: string) => {
    const value = String(formData.get(name) ?? '').trim();
    return value || null;
  };

  const imageUrl = optional('image_url');

  if (imageUrl) {
    let parsedUrl: URL;

    try {
      parsedUrl = new URL(imageUrl);
    } catch {
      throw new Error('De afbeeldings-URL is niet geldig.');
    }

    if (
      parsedUrl.protocol !== 'https:' ||
      parsedUrl.hostname !== 'fakestoreapi.com'
    ) {
      throw new Error(
        'Gebruik voorlopig alleen een afbeelding van fakestoreapi.com.',
      );
    }
  }

  return {
    title,
    price,
    description: optional('description'),
    category: optional('category'),
    image_url: imageUrl,
    is_hidden: formData.get('is_hidden') === 'on',
  };
}

export async function getAllProducts(): Promise<Product[]> {
  await requireAuth();
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getAdminProduct(id: number): Promise<Product | null> {
  await requireAuth();
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
}

export async function createProduct(formData: FormData) {
  await requireAuth();
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.from('products').insert(readForm(formData));

  if (error) throw new Error(error.message);

  revalidatePath('/products');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function updateProduct(id: number, formData: FormData) {
  await requireAuth();
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase
    .from('products')
    .update(readForm(formData))
    .eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath('/products');
  revalidatePath(`/products/${id}`);
  revalidatePath('/admin');
  redirect('/admin');
}

export async function toggleVisibility(id: number, hidden: boolean) {
  await requireAuth();
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase
    .from('products')
    .update({ is_hidden: !hidden })
    .eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath('/products');
  revalidatePath(`/products/${id}`);
  revalidatePath('/admin');
}

export async function deleteProduct(id: number) {
  await requireAuth();
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.from('products').delete().eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath('/products');
  revalidatePath('/admin');
}
