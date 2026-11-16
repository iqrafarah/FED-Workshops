import Link from 'next/link';
import { getDictionary } from '@/i18n/get-dictionary';

export default async function ProductNotFound() {
  const { t } = await getDictionary();

  return (
    <main className="mx-auto max-w-7xl p-12">
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h1 className="text-xl font-bold text-slate-900">
          {t.products.notFoundTitle}
        </h1>
        <p className="mt-2 text-slate-600">
          {t.products.notFoundText}
        </p>
        <Link
          href="/products"
          className="mt-4 inline-block border shadow-sm rounded-lg bg-indigo-600 px-5 py-3 text-white font-semibold transition-colors hover:bg-indigo-700"
        >
          {t.products.backToProducts}
        </Link>
      </div>
    </main>
  );
}
