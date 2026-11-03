import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { FakeStoreProduct } from '@/types/product';

async function getProduct(id: string): Promise<FakeStoreProduct | null> {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error('Het product kon niet worden opgehaald.');
  }

  const text = await response.text();
  if (!text) return null;

  const product = JSON.parse(text) as FakeStoreProduct;
  if (!product?.id) return null;

  return product;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 md:grid-cols-2">
      <div className="relative min-h-96 rounded-2xl border bg-white">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain p-10"
          priority
        />
      </div>
      <article>
        <p className="font-semibold uppercase text-indigo-600">
          {product.category}
        </p>
        <h1 className="mt-3 text-4xl font-bold">{product.title}</h1>
        <p className="mt-5 text-3xl font-bold">€ {product.price.toFixed(2)}</p>
        <p className="mt-6 leading-7 text-gray-600">{product.description}</p>
        <p className="mt-5 text-sm text-gray-500">
          Beoordeling: {product.rating.rate} ({product.rating.count}{' '}
          beoordelingen)
        </p>
        <Link
          href="/products"
          className="mt-8 inline-flex font-semibold text-indigo-600"
        >
          ← Terug naar alle producten
        </Link>
      </article>
    </main>
  );
}
