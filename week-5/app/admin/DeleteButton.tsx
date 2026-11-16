'use client';

import { FaTrash } from 'react-icons/fa';

export default function DeleteButton() {
  return (
    <button
      type="submit"
      onClick={(event) => {
        if (!confirm('Weet je zeker dat je dit product wilt verwijderen?')) {
          event.preventDefault();
        }
      }}
      aria-label="Product verwijderen"
      title="Product verwijderen"
      className="
        flex h-9 w-9 cursor-pointer items-center justify-center
        rounded-lg border border-red-200
        text-red-600
        transition-colors
        hover:border-red-300 hover:bg-red-50 hover:text-red-700
      "
    >
      <FaTrash />
    </button>
  );
}
