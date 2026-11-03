import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/format-price';
import type { Product } from '@/types/product';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const hasProductImage = Boolean(product.image_url);

  const imageSource =
    product.image_url ?? '/images/product-placeholder.png';

  const imageAlt = hasProductImage
    ? product.title
    : `Geen afbeelding beschikbaar voor ${product.title}`;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <div className="relative aspect-square bg-gray-50">
        <Image
          src={imageSource}
          alt={imageAlt}
          loading="eager"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-8 transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        {product.category && (
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            {product.category}
          </p>
        )}

        <h2 className="mt-2 line-clamp-2 text-xl font-bold text-gray-900">
          {product.title}
        </h2>

        {product.description && (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
            {product.description}
          </p>
        )}

        <div className="mt-auto pt-6">
          <p className="text-2xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </p>

          <span className="mt-5 flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition group-hover:bg-indigo-700">
            Bekijk product
            <span
              aria-hidden="true"
              className="ml-2 transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
