import { FaEye, FaEyeSlash, FaPen } from 'react-icons/fa';
import Link from 'next/link';
import DeleteButton from '@/app/admin/DeleteButton';
import { formatPrice } from '@/lib/format-price';
import {
  deleteProduct,
  getAllProducts,
  toggleVisibility,
} from '@/app/actions/products';

export default async function AdminPage() {
  const products = await getAllProducts();

  return (
    <main className="mx-auto max-w-7xl p-8">
      <div className="mb-8 flex justify-between">
        <h1 className="text-3xl font-bold">Productbeheer</h1>

        <Link
          href="/admin/products/new"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700"
        >
          Nieuw product
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="p-4">Product</th>
              <th className="px-4 text-right">Prijs</th>
              <th>Status</th>
              <th>Acties</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="p-4">
                  <strong>{product.title}</strong>
                </td>

                <td className="whitespace-nowrap px-4 text-right">
                  {formatPrice(product.price)}
                </td>

                <td>{product.is_hidden ? 'Verborgen' : 'Zichtbaar'}</td>

                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {/* Tonen / verbergen */}
                    <form
                      action={toggleVisibility.bind(
                        null,
                        product.id,
                        product.is_hidden,
                      )}
                    >
                      <button
                        type="submit"
                        aria-label={
                          product.is_hidden
                            ? 'Product tonen'
                            : 'Product verbergen'
                        }
                        title={
                          product.is_hidden
                            ? 'Product tonen'
                            : 'Product verbergen'
                        }
                        className="
                          flex h-9 w-9 cursor-pointer items-center justify-center
                          rounded-lg border border-gray-200
                          text-gray-600
                          transition-colors
                          hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600
                        "
                      >
                        {product.is_hidden ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    </form>

                    {/* Bewerken */}
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      aria-label="Product bewerken"
                      title="Product bewerken"
                      className="
                        flex h-9 w-9 cursor-pointer items-center justify-center
                        rounded-lg border border-gray-200
                        text-gray-600
                        transition-colors
                        hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600
                      "
                    >
                      <FaPen />
                    </Link>

                    {/* Verwijderen */}
                    <form action={deleteProduct.bind(null, product.id)}>
                      <DeleteButton />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
