import Image from 'next/image';
import Link from 'next/link';
import type { FakeStoreProduct } from '@/types/product';

async function getProducts(): Promise<FakeStoreProduct[]> {
  const response = await fetch('https://fakestoreapi.com/products');

  if (!response.ok) {
    throw new Error('De producten konden niet worden opgehaald.');
  }

  return response.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Producten</h1>
        <p className="mt-2 text-gray-600">Bekijk ons complete assortiment.</p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <div className="relative aspect-square bg-gray-50">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-contain p-8 transition duration-300 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
                {product.category}
              </p>
              <h2 className="mt-2 line-clamp-2 text-xl font-bold text-gray-900">
                {product.title}
              </h2>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                {product.description}
              </p>

              <div className="mt-auto pt-6">
                <div className="flex items-end justify-between gap-4">
                  <p className="text-2xl font-bold text-gray-900">
                    € {product.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    ★ {product.rating.rate}
                  </p>
                </div>

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
        ))}
      </div>
    </main>
  );
}
