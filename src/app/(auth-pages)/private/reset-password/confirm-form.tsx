'use client'

import SubmitButton, { Status } from '@/components/animated/submit-button';
import { FormBanner } from '@/components/form/form-banner';
import { PasswordField } from '@/components/form/form-fields';
import { Form } from '@/components/ui/form';
import { useHashParams } from '@/lib/hooks/use-hash-params';
import { ConfirmPasswordSchema, Message } from '@/lib/types';
import { resetPasswordAction } from '@/server/actions/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';


export default function ConfirmForm() {
    const [status, setStatus] = useState<Status | undefined>();
    const [message, setMessage] = useState<Message>();
    const { error, error_code, error_description } = useHashParams();
    const router = useRouter();

    const form = useForm<z.infer<typeof ConfirmPasswordSchema>>({
        resolver: zodResolver(ConfirmPasswordSchema),
        defaultValues: { password: '', confirmPassword: '' }
    });

    const onSubmit = async (data: z.infer<typeof ConfirmPasswordSchema>) => {
        setStatus('loading');
        const result = await resetPasswordAction(data);

        if (result.success) {
            setStatus('success');
            setMessage({ success: result.details ?? result.success });
            router.back();
        } else {
            setStatus('failed');
            setMessage({ error: result.details ?? result.error });
        }
    };

    const passwordValue = form.watch('password');
    const confirmPasswordValue = form.watch('confirmPassword');

    useEffect(() => {
        if (form.getFieldState('password').isTouched || form.getFieldState('confirmPassword').isTouched) {
            setStatus(undefined);
            setMessage(undefined);
        }
    }, [passwordValue, confirmPasswordValue, form]);

    return (
        error
            ? (<p className="text-destructive font-semibold text-lg">Error: {error_description} (Code: {error_code})</p>)
            : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col w-full justify-center space-y-8 mx-auto"
                    >
                        <PasswordField control={form.control} name="password" label="New Password" />
                        <PasswordField control={form.control} name="confirmPassword" label="Confirm New Password" />
                        {message && <FormBanner message={message} />}
                        <SubmitButton status={status} isSubmitting={form.formState.isSubmitting}>Submit</SubmitButton>
                    </form>
                </Form>
            )

    );
}