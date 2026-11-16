import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary();
  return { title: t.contact.title, description: t.meta.contactDescription };
}

export default async function ContactPage() {
  const { t } = await getDictionary();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="max-w-2xl">
        <p className="font-semibold text-indigo-600">{t.contact.eyebrow}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
          {t.contact.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          {t.contact.text}
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <form className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              {t.contact.name}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              {t.contact.email}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium">
              {t.contact.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            {t.contact.send}
          </button>
        </form>

        <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">{t.contact.companyDetails}</h2>
          <address className="mt-4 space-y-2 not-italic leading-7 text-slate-600">
            <p>Fictiestraat 123</p>
            <p>1234 AB Utrecht</p>
            <p>
              <a className="hover:text-indigo-600" href="tel:+31101234567">
                +31 10 123 45 67
              </a>
            </p>
            <p>
              <a
                className="hover:text-indigo-600"
                href="mailto:hello@acme.test"
              >
                hello@acme.test
              </a>
            </p>
          </address>
        </aside>
      </div>

      <p className="mt-6 text-sm text-amber-700">
        {t.contact.notice}
      </p>
    </main>
  );
}
