import Link from 'next/link';
import { login } from '@/app/actions/auth';
import { getAuthClaims } from '@/lib/supabase/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const claims = await getAuthClaims().catch(() => null);

  if (claims) {
    redirect('/admin');
  }

  const { error } = await searchParams;
  const errorMessage = error
    ? error === 'missing_fields'
      ? 'Vul je e-mailadres en wachtwoord in.'
      : error === 'invalid_credentials'
        ? 'De combinatie van e-mailadres en wachtwoord is niet geldig. Controleer je gegevens en probeer opnieuw.'
        : 'Inloggen is momenteel niet gelukt. Probeer het later opnieuw.'
    : null;

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
          ACME beheer
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-950">Inloggen</h1>

        <p className="mt-3 text-slate-600">Log in om producten te beheren.</p>

        {errorMessage && (
          <div
            id="login-error"
            role="alert"
            aria-atomic="true"
            className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
          >
            {errorMessage}
          </div>
        )}

        <form action={login} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              E-mailadres
            </label>
            <input
              id="email"
              name="email"
              type="email"
              aria-describedby={errorMessage ? 'login-error' : undefined}
              autoComplete="email"
              required
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Wachtwoord
            </label>
            <input
              id="password"
              name="password"
              type="password"
              aria-describedby={errorMessage ? 'login-error' : undefined}
              autoComplete="current-password"
              required
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Inloggen
          </button>
        </form>

        <Link
          href="/"
          className="mt-6 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-800"
        >
          ← Terug naar de webshop
        </Link>
      </div>
    </main>
  );
}
