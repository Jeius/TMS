'use client';

import SubmitButton, { Status } from '@/components/animated/submit-button';
import { FormBanner } from '@/components/form/form-banner';
import { EmailField, PasswordField } from '@/components/form/form-fields';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Message } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signUpAction } from '../lib/actions';
import { SignUpSchema } from '../lib/schema';

export default function SignUp() {
  const [status, setStatus] = useState<Status | undefined>();
  const [message, setMessage] = useState<Message>();
  const searchParams = new URLSearchParams(useSearchParams().toString());
  searchParams.delete('signUp');

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
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-medium">Create account</CardTitle>
        <CardDescription className="text-foreground">
          Already have an account?{' '}
          <Link
            className="font-semibold text-secondary/80 hover:text-secondary"
            href={`/login?${searchParams.toString()}`}
          >
            Sign in
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto flex flex-col justify-center space-y-8"
          >
            <EmailField
              placeholder="Enter your email address"
              autoComplete="email webauthn"
              control={form.control}
              name="email"
              label="Email"
            />
            <PasswordField
              placeholder="Enter your password"
              autoComplete="new-password webauthn"
              control={form.control}
              name="password"
              label="Password"
            />
            <PasswordField
              placeholder="Confirm your password"
              autoComplete="new-password webauthn"
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
            />
            {message && <FormBanner message={message} />}
            <SubmitButton status={status}>Sign Up</SubmitButton>
          </form>
        </Form>
      </CardContent>
    </>
  );
}
