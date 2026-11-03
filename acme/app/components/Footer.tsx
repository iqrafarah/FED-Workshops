import React from 'react';
import Link from 'next/link';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {year} ACME. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <Link href="/" className="hover:text-indigo-600">
            Home
          </Link>
          <Link href="/products" className="hover:text-indigo-600">
            Products
          </Link>
          <Link href="/contact" className="hover:text-indigo-600">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
