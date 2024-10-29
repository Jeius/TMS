'use server';

import { supabaseServerClient } from '@/lib/supabase/server';
import { AuthActionResponse } from '@/lib/types';
import * as z from 'zod';
import { EmailSchema } from '../lib/schema';

export async function forgotPasswordAction(data: z.infer<typeof EmailSchema>): Promise<AuthActionResponse> {
    const result = EmailSchema.safeParse(data);

    if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        console.log('Validation errors:', errors);
        return { error: 'Invalid form submission' };
    }

    const { email } = result.data;
    const supabase = await supabaseServerClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
        console.error(error.message);
        return { error: 'Could not reset password', details: error.message };
    }

    return { success: 'Submitted successfully', details: `A confirmation link has been sent to ${email}` };
}