'use client'

import SubmitButton, { Status } from '@/components/animated/submit-button';
import { FormBanner } from '@/components/form/form-banner';
import { EmailField, PasswordField } from '@/components/form/form-fields';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Message, SignInSchema } from '@/lib/types';
import { wait } from '@/lib/utils';
import { signInAction } from '@/server/actions/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export default function SignIn() {
    const [status, setStatus] = useState<Status | undefined>();
    const [message, setMessage] = useState<Message>();
    const router = useRouter();

    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
        setStatus('loading');
        const result = await signInAction(data);

        if (result.success) {
            setStatus('success');
            setMessage({ success: result.details ?? result.success })
            router.push('/');
        } else {
            setStatus('failed');
            setMessage({ error: result.details ?? result.error })
            await wait(2000);
            setStatus(undefined);
        }
    };

    const emailValue = form.watch('email');
    const passwordValue = form.watch('password');

    useEffect(() => {
        if (form.getFieldState('email').isTouched || form.getFieldState('password')) {
            setStatus(undefined);
            setMessage(undefined);
        }
    }, [emailValue, passwordValue, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col w-full justify-center space-y-8 mx-auto"
            >
                <EmailField formControl={form.control} name="email" label="Email" />
                <PasswordField formControl={form.control} name="password" label="Password" />
                <Button variant="link" size="sm" className="text-muted-foreground w-fit p-0 hover:text-foreground hover:no-underline" asChild>
                    <Link href="/forgot-password">Forgot password</Link>
                </Button>
                {message && <FormBanner message={message} />}
                <SubmitButton status={status} isSubmitting={form.formState.isSubmitting}>Sign In</SubmitButton>
            </form>
        </Form>
    );
}


