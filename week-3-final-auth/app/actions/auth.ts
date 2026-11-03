'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function login(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');

  if (!email || !password) {
    redirect('/login?error=missing_fields');
  }

  let loginError: 'invalid_credentials' | 'login_failed' | null = null;

  try {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      loginError =
        error.code === 'invalid_credentials'
          ? 'invalid_credentials'
          : 'login_failed';
    }
  } catch {
    loginError = 'login_failed';
  }

  if (loginError) {
    redirect(`/login?error=${loginError}`);
  }

  revalidatePath('/', 'layout');
  redirect('/admin');
}

export async function logout() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();

  revalidatePath('/', 'layout');
  redirect('/');
}
