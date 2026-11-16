import ProductForm from '@/app/admin/ProductForm';
import { getAdminProduct, updateProduct } from '@/app/actions/products';
import { notFound } from 'next/navigation';

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);
  if (!Number.isInteger(productId)) notFound();
  const product = await getAdminProduct(productId);
  if (!product) notFound();

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Product bewerken</h1>
      <ProductForm
        action={updateProduct.bind(null, productId)}
        product={product}
        submitLabel="Wijzigingen opslaan"
      />
    </main>
  );
}
