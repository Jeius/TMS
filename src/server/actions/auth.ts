'use server';

import { supabaseServerClient } from '@/lib/supabase/server';

export const signOutAction = async () => {
  const supabase = await supabaseServerClient();
  return await supabase.auth.signOut();
};
