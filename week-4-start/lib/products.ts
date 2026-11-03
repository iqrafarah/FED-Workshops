import type { Product } from '@/types/product';

function config() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error('Publieke Supabase-variabelen ontbreken.');
  return { url, key };
}

export async function getVisibleProducts(): Promise<Product[]> {
  const { url, key } = config();
  const endpoint = `${url}/rest/v1/products?select=*&is_hidden=eq.false&order=created_at.desc`;
  const response = await fetch(endpoint, {
    headers: { apikey: key },
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('Supabase-producten ophalen mislukt.');
  return response.json();
}

export async function getVisibleProduct(id: string): Promise<Product | null> {
  const { url, key } = config();
  const endpoint = `${url}/rest/v1/products?select=*&id=eq.${encodeURIComponent(id)}&is_hidden=eq.false`;
  const response = await fetch(endpoint, {
    headers: { apikey: key },
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('Supabase-product ophalen mislukt.');
  const products: Product[] = await response.json();
  return products[0] ?? null;
}
