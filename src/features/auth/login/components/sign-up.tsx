'use client'

import SubmitButton, { Status } from '@/components/animated/submit-button';
import { FormBanner } from '@/components/form/form-banner';
import { EmailField, PasswordField } from '@/components/form/form-fields';
import { Form } from '@/components/ui/form';
import { Message } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { SignUpSchema } from '../lib/schema';
import { signUpAction } from '../server/actions';

export default function SignUp() {
    const [status, setStatus] = useState<Status | undefined>();
    const [message, setMessage] = useState<Message>();

    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
        setStatus('loading');
        const result = await signUpAction(data);

        if (result.success) {
            setStatus('success');
            setMessage({ success: result.details ?? result.success });
        } else {
            setStatus('failed');
            setMessage({ error: result.details ?? result.error });
        }
    };

    const emailValue = form.watch('email');
    const passwordValue = form.watch('password');
    const confirmPasswordValue = form.watch('confirmPassword');

    useEffect(() => {
        if (
            form.getFieldState('email').isTouched ||
            form.getFieldState('password').isTouched ||
            form.getFieldState('confirmPassword').isTouched
        ) {
            setStatus(undefined);
            setMessage(undefined);
        }
    }, [emailValue, passwordValue, confirmPasswordValue, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col justify-center space-y-8 mx-auto"
            >
                <EmailField control={form.control} name="email" label="Email" />
                <PasswordField control={form.control} name="password" label="Password" />
                <PasswordField control={form.control} name="confirmPassword" label="Confirm Password" />
                {message && <FormBanner message={message} />}
                <SubmitButton status={status}>Sign Up</SubmitButton>
            </form>
        </Form>
    );
}


