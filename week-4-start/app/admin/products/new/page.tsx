import ProductForm from '@/app/admin/ProductForm';
import { createProduct } from '@/app/actions/products';

export default function NewProductPage() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Nieuw product</h1>
      <ProductForm action={createProduct} submitLabel="Product toevoegen" />
    </main>
  );
}
