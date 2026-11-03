import ProductCard from '@/app/components/ProductCard';
import Link from 'next/link';
import { getVisibleProducts } from '@/lib/products';

type Props = {
  searchParams: Promise<{ q?: string | string[]; category?: string | string[] }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const filters = await searchParams;
  const query = typeof filters.q === 'string' ? filters.q.trim() : '';
  const category = typeof filters.category === 'string' ? filters.category : '';
  const products = await getVisibleProducts();
  const categories = [...new Set(products.flatMap((product) =>
    product.category ? [product.category] : [],
  ))].sort((a, b) => a.localeCompare(b, 'nl'));
  const searchTerm = query.toLocaleLowerCase('nl-NL');
  const filteredProducts = products.filter((product) => {
    const matchesCategory = !category || product.category === category;
    const searchText = `${product.title} ${product.description ?? ''}`
      .toLocaleLowerCase('nl-NL');
    return matchesCategory && searchText.includes(searchTerm);
  });

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Producten</h1>
        <p className="mt-2 text-gray-600">Bekijk ons complete assortiment.</p>
      </div>

      <form
        action="/products"
        method="get"
        className="mb-8 flex flex-wrap items-end gap-4"
      >
        <div className="min-w-0 flex-1 basis-64">
          <label htmlFor="product-search" className="block font-medium">
            Zoek producten
          </label>
          <input
            id="product-search"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Zoek op titel of beschrijving"
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 focus:outline-2 focus:outline-indigo-600"
          />
        </div>
        <div>
          <label htmlFor="product-category" className="block font-medium">
            Categorie
          </label>
          <select
            id="product-category"
            name="category"
            defaultValue={category}
            className="mt-2 max-w-full rounded-lg border border-gray-300 bg-white px-3 py-2 focus:outline-2 focus:outline-indigo-600"
          >
            <option value="">Alle categorieën</option>
            {category && !categories.includes(category) && (
              <option value={category}>{category}</option>
            )}
            {categories.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
        >
          Filteren
        </button>
        <Link href="/products" className="rounded-lg border px-4 py-2">
          Filters wissen
        </Link>
      </form>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <h2 className="text-xl font-semibold">Er zijn nog geen producten</h2>

          <p className="mt-2 text-gray-600">
            Voeg via het beheergedeelte een product toe.
          </p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <h2 className="text-xl font-semibold">Geen producten gevonden</h2>
          <p className="mt-2 text-gray-600">
            Probeer een andere zoekterm of wis de filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
