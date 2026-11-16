import Link from "next/link";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function Footer() {
  const { t } = await getDictionary();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© {new Date().getFullYear()} ACME. {t.footer.rights}</p>
        <nav aria-label={t.nav.footer} className="flex gap-4">
          <Link href="/">{t.nav.home}</Link>
          <Link href="/products">{t.nav.products}</Link>
          <Link href="/contact">{t.nav.contact}</Link>
        </nav>
      </div>
    </footer>
  );
}
