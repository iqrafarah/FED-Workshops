import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getVisibleProduct } from '@/lib/products';
import { formatPrice } from '@/lib/format-price';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getVisibleProduct(id);

  if (!product) {
    notFound();
  }

  const hasProductImage = Boolean(product.image_url);
  const imageSource = product.image_url ?? '/images/product-placeholder.png';
  const imageAlt = hasProductImage
    ? product.title
    : `Geen afbeelding beschikbaar voor ${product.title}`;

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:px-8">
      <div className="relative min-h-96 rounded-2xl border border-gray-200 bg-white">
        <Image
          src={imageSource}
          alt={imageAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain p-10"
          priority
        />
      </div>

      <article>
        {product.category && (
          <p className="font-semibold uppercase tracking-wide text-indigo-600">
            {product.category}
          </p>
        )}
        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          {product.title}
        </h1>
        <p className="mt-5 text-3xl font-bold">
          {formatPrice(product.price)}
        </p>
        {product.description && (
          <p className="mt-6 leading-7 text-gray-600">{product.description}</p>
        )}
        <Link
          href="/products"
          className="mt-8 inline-flex font-semibold text-indigo-600 hover:text-indigo-800"
        >
          ← Terug naar alle producten
        </Link>
      </article>
    </main>
  );
}
