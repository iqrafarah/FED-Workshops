'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { isLocale, localeCookieName } from '@/i18n/config';

export async function setLocale(locale: string) {
  if (!isLocale(locale)) return;

  (await cookies()).set(localeCookieName, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
  revalidatePath('/', 'layout');
}
