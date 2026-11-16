'use client';

import Link from 'next/link';

export default function ProductsError({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto max-w-7xl p-12">
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h1 className="text-xl font-bold text-red-900">Er ging iets mis</h1>
        <p className="mt-2 text-red-700">
          De producten konden niet worden geladen.
        </p>
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => reset()}
            className="rounded bg-red-700 px-4 py-2 text-white"
          >
            Probeer opnieuw
          </button>
          <Link
            href="/products"
            className="rounded border border-red-700 px-4 py-2 text-red-700"
          >
            Terug naar producten
          </Link>
        </div>
      </div>
    </main>
  );
}
