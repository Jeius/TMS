'use server';

import { supabaseServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const signOutAction = async () => {
  const supabase = await supabaseServerClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  return redirect('/');
};
