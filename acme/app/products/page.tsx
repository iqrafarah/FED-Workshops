import type { Metadata } from 'next';
import ProductCard from '@/app/components/ProductCard';

export const metadata: Metadata = {
  title: 'Producten',
  description: 'Bekijk de oplossingen van ACME.',
};

const products = [
  {
    id: 1,
    emoji: '🧰',
    title: 'ACME Toolkit',
    description: 'Een complete gereedschapskist voor teams die sneller willen werken.',
    price: 49,
  },
  {
    id: 2,
    emoji: '📦',
    title: 'ACME Box',
    description: 'Veilige opslag en eenvoudig delen zonder je werkproces te vertragen.',
    price: 29,
  },
  {
    id: 3,
    emoji: '🤖',
    title: 'ACME Assist',
    description: 'Slimme automatisering voor terugkerende werkzaamheden.',
    price: 99,
  },
  {
    id: 4,
    emoji: '📊',
    title: 'ACME Insights',
    description: 'Dashboards with the right KPIs—no more, no less.',
    price: 59,
  },
  {
    id: 5,
    emoji: '🧩',
    title: 'ACME Integrations',
    description: 'Connect your favorite tools with a single click.',
    price: 39,
  },
  {
    id: 6,
    emoji: '🛡',
    title: 'ACME Shield',
    description: 'Security you notice only when needed.',
    price: 79,
  },
];

function Page() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold">Our products</h1>
        <p className="mt-2 text-gray-600 max-w-prose">A selection of fictional ACME solutions. Prices are placeholders and VAT‑incl. </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} emoji={product.emoji} title={product.title} description={product.description} price={product.price} />
        ))}
      </div>
    </main>
  );
}

export default Page;
