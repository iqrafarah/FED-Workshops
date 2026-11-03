import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <section className="relative isolate min-h-155 overflow-hidden bg-stone-50">
        <Image
          src="/images/background-placeholder.png"
          alt="Verschillende ACME-verpakkingen en een boodschappentas"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />

        <div className="absolute inset-0 bg-linear-to-r from-stone-50 via-stone-50/90 to-transparent" />

        <div className="relative mx-auto flex min-h-155 w-full max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
              Welkom bij ACME
            </p>
            <h1 className="mt-4 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Alles wat je nodig hebt, op één plek
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-gray-700">
              Ontdek het productaanbod van ACME. Praktische producten,
              zorgvuldig geselecteerd en overzichtelijk gepresenteerd.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
              >
                Bekijk producten
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-900 shadow-sm transition-colors hover:bg-gray-50"
              >
                Neem contact op
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
