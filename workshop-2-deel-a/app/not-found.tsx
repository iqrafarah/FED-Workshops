import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4 py-12">
      <div className="text-center">
        <p className="text-6xl font-bold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">
          Pagina niet gevonden
        </h1>
        <p className="mt-3 text-gray-600">
          De pagina die je zoekt bestaat niet of is verplaatst.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block border shadow-sm rounded-lg bg-indigo-600 px-5 py-3 text-white font-semibold transition-colors hover:bg-indigo-700"
        >
          Terug naar home
        </Link>
      </div>
    </main>
  );
}
