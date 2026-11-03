import type { Product } from '@/types/product';
import Link from 'next/link';

type Props = {
  action: (formData: FormData) => Promise<void>;
  product?: Product;
  submitLabel: string;
};

const field = 'mt-1 w-full rounded-lg border px-3 py-2';

export default function ProductForm({ action, product, submitLabel }: Props) {
  return (
    <form
      action={action}
      className="space-y-5 rounded-2xl bg-white p-6 shadow-sm"
    >
      <label className="block">
        Titel *
        <input
          name="title"
          required
          defaultValue={product?.title ?? ''}
          className={field}
        />
      </label>
      <label className="block">
        Prijs *
        <input
          name="price"
          type="number"
          min="0"
          step="0.01"
          required
          defaultValue={product?.price ?? ''}
          className={field}
        />
      </label>
      <label className="block">
        Categorie
        <input
          name="category"
          defaultValue={product?.category ?? ''}
          className={field}
        />
      </label>
      <label className="block">
        Beschrijving
        <textarea
          name="description"
          rows={6}
          defaultValue={product?.description ?? ''}
          className={field}
        />
      </label>
      <label className="block">
        URL van afbeelding
        <input
          name="image_url"
          type="url"
          defaultValue={product?.image_url ?? ''}
          className={field}
        />
        <span className="mt-1 block text-sm text-gray-500">
          Optioneel. Gebruik voorlopig alleen een https-URL van
          fakestoreapi.com. Laat het veld leeg om de lokale placeholder te
          gebruiken.
        </span>
      </label>
      <label className="flex gap-3">
        <input
          name="is_hidden"
          type="checkbox"
          defaultChecked={product?.is_hidden ?? false}
        />
        Verberg in de publieke webshop
      </label>
      <div className="flex gap-3">
        <button className="rounded bg-indigo-600 px-4 py-2 font-semibold text-white">
          {submitLabel}
        </button>
        <Link href="/admin" className="rounded border px-4 py-2">
          Annuleren
        </Link>
      </div>
    </form>
  );
}
