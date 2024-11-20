'use server';

import { supabaseServerClient } from '@/lib/supabase/server';
import { AuthActionResponse } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import * as z from 'zod';
import { SignUpSchema } from '../lib/schema';

export async function signUpAction(
  data: z.infer<typeof SignUpSchema>
): Promise<AuthActionResponse> {
  const result = SignUpSchema.safeParse(data);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    console.log('Validation errors:', errors);
    return { error: 'Invalid form submission' };
  }

  const { email, password } = result.data;
  const supabase = await supabaseServerClient();
  const origin = (await headers()).get('origin');

  const { error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/confirm`,
    },
  });

  if (signUpError) {
    if (signUpError.message.includes('already registered')) {
      return {
        error: 'This email is already registered. Please use another one.',
      };
    }
    console.error(signUpError.code + ' ' + signUpError.message);
    return { error: 'Authentication error', details: signUpError.message };
  } else {
    revalidatePath('/');
    return {
      success: 'Signed up successfully',
      details: `Please verify your account! Confirmation link was sent to "${email}".`,
    };
  }
}
