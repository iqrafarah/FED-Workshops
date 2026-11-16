'use server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/supabase/auth';
import { deleteProductImage, uploadProductImage } from '@/lib/product-images';
import type { Product } from '@/types/product';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

function readProductFields(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim();
  const price = Number(formData.get('price'));

  if (!title) {
    throw new Error('Titel is verplicht.');
  }

  if (!Number.isFinite(price) || price < 0) {
    throw new Error('Ongeldige prijs.');
  }

  const optional = (name: string) => {
    const value = String(formData.get(name) ?? '').trim();
    return value || null;
  };

  return {
    title,
    price,
    description: optional('description'),
    category: optional('category'),
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

  const fields = readProductFields(formData);
  const image = formData.get('image');

  let imageUrl: string | null = null;

  if (image instanceof File && image.size > 0) {
    const uploaded = await uploadProductImage(image);
    imageUrl = uploaded.publicUrl;
  }

  const { error } = await supabase.from('products').insert({
    ...fields,
    image_url: imageUrl,
  });

  if (error) {
    if (imageUrl) {
      await deleteProductImage(imageUrl);
    }
    throw new Error(error.message);
  }

  revalidatePath('/products');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function updateProduct(id: number, formData: FormData) {
  await requireAuth();
  const supabase = await createServerSupabaseClient();

  const { data: currentProduct, error: currentError } = await supabase
    .from('products')
    .select('image_url')
    .eq('id', id)
    .single();

  if (currentError) {
    throw new Error(currentError.message);
  }

  const fields = readProductFields(formData);
  const image = formData.get('image');
  const removeImage = formData.get('remove_image') === 'on';

  let nextImageUrl = currentProduct.image_url;
  let uploadedImageUrl: string | null = null;

  if (image instanceof File && image.size > 0) {
    const uploaded = await uploadProductImage(image);
    uploadedImageUrl = uploaded.publicUrl;
    nextImageUrl = uploaded.publicUrl;
  } else if (removeImage) {
    nextImageUrl = null;
  }

  const { error } = await supabase
    .from('products')
    .update({
      ...fields,
      image_url: nextImageUrl,
    })
    .eq('id', id);

  if (error) {
    if (uploadedImageUrl) {
      await deleteProductImage(uploadedImageUrl);
    }
    throw new Error(error.message);
  }

  if (currentProduct.image_url && currentProduct.image_url !== nextImageUrl) {
    await deleteProductImage(currentProduct.image_url);
  }

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

  const { data: product, error: readError } = await supabase
    .from('products')
    .select('image_url')
    .eq('id', id)
    .single();

  if (readError) {
    throw new Error(readError.message);
  }

  const { error } = await supabase.from('products').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  await deleteProductImage(product.image_url);

  revalidatePath('/products');
  revalidatePath('/admin');
}
