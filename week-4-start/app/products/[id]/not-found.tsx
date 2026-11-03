import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <main className="mx-auto max-w-7xl p-12">
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h1 className="text-xl font-bold text-slate-900">
          Product niet gevonden
        </h1>
        <p className="mt-2 text-slate-600">
          Het product dat je zoekt bestaat niet of is niet meer beschikbaar.
        </p>
        <Link
          href="/products"
          className="mt-4 inline-block border shadow-sm rounded-lg bg-indigo-600 px-5 py-3 text-white font-semibold transition-colors hover:bg-indigo-700"
        >
          Terug naar producten
        </Link>
      </div>
    </main>
  );
}
