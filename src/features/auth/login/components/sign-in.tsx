'use client';

import SubmitButton, { Status } from '@/components/animated/submit-button';
import { FormBanner } from '@/components/form/form-banner';
import { EmailField, PasswordField } from '@/components/form/form-fields';
import { Button } from '@/components/ui/button';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { supabaseBrowserClient } from '@/lib/supabase/client';
import { Message } from '@/lib/types';
import { wait } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { SignInSchema } from '../lib/schema';

export default function SignIn() {
  const [status, setStatus] = useState<Status | undefined>();
  const [message, setMessage] = useState<Message>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
    setStatus('loading');
    const result = SignInSchema.safeParse(data);

    if (!result.success) {
      setMessage({ error: 'Invalid form submission' });
      return;
    }

    const { email, password } = result.data;
    const supabase = supabaseBrowserClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setStatus('failed');
      setMessage({ error: error.message });
    } else {
      setStatus('success');
      setMessage({ success: 'Signed in successfully' });
      await wait(100);

      const redirectTo = searchParams.get('redirect_to');

      if (redirectTo && redirectTo !== '/') {
        router.replace(redirectTo);
      } else {
        router.replace('/dashboard');
      }
    }
  };

  const emailValue = form.watch('email');
  const passwordValue = form.watch('password');

  useEffect(() => {
    if (
      form.getFieldState('email').isTouched ||
      form.getFieldState('password').isTouched
    ) {
      setStatus(undefined);
      setMessage(undefined);
    }
  }, [emailValue, passwordValue, form]);

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Welcome!</CardTitle>
        <CardDescription className="leading-6 text-foreground [&:not(:first-child)]:mt-6">
          Please enter your email and password to sign in. <br />
          Don&apos;t have an account?{' '}
          <Link
            className="font-semibold text-secondary/80 hover:text-secondary"
            href={`/login?${searchParams.toString()}&signUp=true`}
          >
            Sign up
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto flex w-full flex-col justify-center space-y-8"
          >
            <EmailField
              placeholder="name@example.com"
              autoComplete="email webauthn"
              control={form.control}
              name="email"
              label="Email"
            />
            <PasswordField
              placeholder="Enter your password"
              autoComplete="current-password webauthn"
              control={form.control}
              name="password"
              label="Password"
            />
            <Button
              variant="link"
              size="sm"
              className="w-fit p-0 text-muted-foreground hover:text-foreground hover:no-underline"
              asChild
            >
              <Link href="/forgot-password">Forgot password</Link>
            </Button>
            {message && <FormBanner message={message} />}
            <SubmitButton status={status}>Sign In</SubmitButton>
          </form>
        </Form>
      </CardContent>
    </>
  );
}
