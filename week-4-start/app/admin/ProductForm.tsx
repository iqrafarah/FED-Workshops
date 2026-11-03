'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, type ChangeEvent } from 'react';
import type { Product } from '@/types/product';

type Props = {
  action: (formData: FormData) => Promise<void>;
  product?: Product;
  submitLabel: string;
};

const field = 'mt-1 w-full rounded-lg border px-3 py-2';

export default function ProductForm({ action, product, submitLabel }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    product?.image_url ?? null,
  );
  const [fileName, setFileName] = useState('');

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setPreviewUrl(product?.image_url ?? null);
      setFileName('');
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(
        typeof reader.result === 'string'
          ? reader.result
          : (product?.image_url ?? null),
      );
    };
    reader.readAsDataURL(file);
  }

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

      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-gray-900">Productafbeelding</p>
          <p className="mt-1 text-sm text-gray-600">
            JPEG, PNG of WebP, maximaal 5 MB.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label
            htmlFor="image"
            className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
          >
            Afbeelding kiezen
          </label>

          <span className="text-sm text-gray-600">
            {fileName || 'Nog geen nieuwe afbeelding gekozen'}
          </span>
        </div>

        <input
          id="image"
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageChange}
          className="sr-only"
        />

        {previewUrl && (
          <div className="relative h-48 w-48 overflow-hidden rounded-xl border bg-gray-50">
            <Image
              src={previewUrl}
              alt="Preview van de productafbeelding"
              fill
              sizes="192px"
              unoptimized={
                previewUrl.startsWith('data:') || previewUrl.startsWith('http')
              }
              onError={() => {
                if (previewUrl !== '/images/product-placeholder.png') {
                  setPreviewUrl('/images/product-placeholder.png');
                }
              }}
              className="object-contain p-2"
            />
          </div>
        )}

        {product?.image_url && (
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" name="remove_image" />
            Huidige afbeelding verwijderen
          </label>
        )}
      </div>

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
