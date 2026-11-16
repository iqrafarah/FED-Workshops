import 'server-only';
import { cookies } from 'next/headers';
import { defaultLocale, isLocale, localeCookieName, type Locale } from './config';
import type { Dictionary } from './dictionaries/nl';

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  nl: () => import('./dictionaries/nl').then((m) => m.default),
  en: () => import('./dictionaries/en').then((m) => m.default),
};

export async function getLocale(): Promise<Locale> {
  const value = (await cookies()).get(localeCookieName)?.value;
  return isLocale(value) ? value : defaultLocale;
}

export async function getDictionary(): Promise<{
  locale: Locale;
  t: Dictionary;
}> {
  const locale = await getLocale();
  return { locale, t: await dictionaries[locale]() };
}
