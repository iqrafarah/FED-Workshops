import { setLocale } from '@/app/actions/locale';
import { locales, type Locale } from '@/i18n/config';

export default function LocaleSwitcher({
  current,
  label,
}: {
  current: Locale;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex items-center gap-1 text-xs font-semibold uppercase">
      {locales.map((locale) => (
        <form key={locale} action={setLocale.bind(null, locale)}>
          <button
            type="submit"
            aria-pressed={locale === current}
            className={
              locale === current
                ? 'rounded-md bg-indigo-600 px-2 py-1 text-white'
                : 'rounded-md px-2 py-1 text-slate-500 transition hover:text-indigo-600'
            }
          >
            {locale}
          </button>
        </form>
      ))}
    </div>
  );
}
