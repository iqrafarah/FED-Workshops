import Link from 'next/link';
import { logout } from '@/app/actions/auth';
import { requireAuth } from '@/lib/supabase/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const claims = await requireAuth();

  return (
    <div className="mx-auto min-h-screen max-w-6xl bg-slate-100">
      <nav className="flex flex-wrap items-center gap-6 border-b bg-white p-4">
        <Link
          href="/admin"
          className="text-slate-600 transition hover:text-indigo-600 focus-visible:outline-indigo-600"
        >
          Productbeheer
        </Link>

        <Link
          href="/admin/products/new"
          className="text-slate-600 transition hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
        >
          Nieuw product
        </Link>

        <Link
          href="/products"
          className="text-slate-600 transition hover:text-indigo-600 focus-visible:outline-indigo-600"
        >
          Webshop →
        </Link>

        <div className="ml-auto flex items-center gap-4">
          <span className="hidden text-sm text-slate-500 sm:inline">
            {String(claims.email ?? claims.sub)}
          </span>

          <form action={logout}>
            <button
              type="submit"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Uitloggen
            </button>
          </form>
        </div>
      </nav>

      {children}
    </div>
  );
}
