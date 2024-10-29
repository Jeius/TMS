'use server';

import { supabaseServerClient } from '@/lib/supabase/server';
import { AuthActionResponse } from '@/lib/types';
import * as z from 'zod';
import { ConfirmPasswordSchema } from '../lib/schema';

export async function resetPasswordAction(data: z.infer<typeof ConfirmPasswordSchema>): Promise<AuthActionResponse> {
    const result = ConfirmPasswordSchema.safeParse(data);

    if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        console.log('Validation errors:', errors);
        return { error: 'Invalid form submission' };
    }

    const { password } = result.data;

    const supabase = await supabaseServerClient();

    const { error } = await supabase.auth.updateUser({
        password: password,
    });

    if (error) {
        return { error: 'Password update failed', details: error.message };
    }

    return { success: 'Password updated' };
}