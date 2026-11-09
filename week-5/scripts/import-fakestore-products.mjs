import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;
if (!url || !secretKey) throw new Error('Supabase-variabelen ontbreken.');

const response = await fetch('https://fakestoreapi.com/products');
if (!response.ok) throw new Error(`Fake Store gaf status ${response.status}.`);

const products = await response.json();
const categoryTranslations = {
  "men's clothing": 'herenkleding',
  "women's clothing": 'dameskleding',
  jewelery: 'sieraden',
  electronics: 'elektronica',
};

const rows = products.map((product) => ({
  external_id: product.id,
  title: product.title,
  price: product.price,
  description: product.description,
  category: categoryTranslations[product.category] ?? product.category,
  image_url: product.image,
  is_hidden: false,
}));

const supabase = createClient(url, secretKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const { error } = await supabase
  .from('products')
  .upsert(rows, { onConflict: 'external_id' });

if (error) throw error;
console.log(`${rows.length} producten zijn geïmporteerd.`);
