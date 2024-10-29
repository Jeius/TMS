'use server';

import { supabaseServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const signOutAction = async () => {
    const supabase = await supabaseServerClient();
    await supabase.auth.signOut();
    return redirect('/');
};
