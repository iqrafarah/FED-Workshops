import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-b from-indigo-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                Smart solutions, <span className="text-indigo-600">zero hassle</span>
              </h1>

              <p className="mt-4 max-w-prose text-lg text-gray-600">
                ACME is a fictional company that delivers real clarity. Sharp products, friendly service, and no fuss. Explore our lineup or get in touch.{' '}
              </p>

              <div className="mt-8 flex gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
                >
                  {' '}
                  Browse products{' '}
                </Link>

                <Link href="/contact" className="inline-flex items-center rounded-xl border border-gray-300 px-5 py-3 font-semibold hover:bg-gray-100">
                  {' '}
                  Contact us{' '}
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="grid aspect-[4/3] w-full place-items-center rounded-2xl border border-gray-200 bg-white text-9xl shadow-xs">⚙️</div>

              <p className="mt-3 text-sm text-gray-500">Illustration — ACME stands for reliable, modular building blocks. </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
              <h3 className="text-lg font-semibold">Simple</h3>
              <p className="mt-2 text-sm text-gray-600">Clear solutions that work right away—no thick manuals. </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
              <h3 className="text-lg font-semibold">Scalable</h3>
              <p className="mt-2 text-sm text-gray-600">Grow without friction—from startup to enterprise. </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
              <h3 className="text-lg font-semibold">Support</h3>
              <p className="mt-2 text-sm text-gray-600">Real people. Real answers. During business hours. </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
              <h3 className="text-lg font-semibold">Open</h3>
              <p className="mt-2 text-sm text-gray-600">Transparent pricing and APIs that speak human. </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white">Ready to get started? </h2>

          <p className="mt-2 text-gray-300">Check out our lineup or request a demo. </p>

          <div className="mt-6 flex justify-center gap-3">
            <Link href="/products" className="rounded-xl bg-white px-5 py-3 font-semibold shadow hover:bg-gray-100">
              {' '}
              See products{' '}
            </Link>

            <Link href="/contact" className="rounded-xl border border-gray-700 px-5 py-3 font-semibold text-white hover:bg-gray-800">
              {' '}
              Ask a question{' '}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
