'use client';

import SubmitButton, { Status } from '@/components/animated/submit-button';
import { FormBanner } from '@/components/form/form-banner';
import { EmailField } from '@/components/form/form-fields';
import { Form } from '@/components/ui/form';
import { Message } from '@/lib/types';
import { wait } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { EmailSchema } from '../lib/schema';
import { forgotPasswordAction } from '../server/actions';

export default function EmailForm() {
  const [status, setStatus] = useState<Status | undefined>();
  const [message, setMessage] = useState<Message>();

  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: z.infer<typeof EmailSchema>) => {
    setStatus('loading');
    const result = await forgotPasswordAction(data);

    if (result.success) {
      setStatus('success');
      setMessage({ success: result.details ?? result.success });
      form.reset();
      await wait(2000);
      setStatus(undefined);
    } else {
      setStatus('failed');
      setMessage({ error: result.details ?? result.error });
      await wait(2000);
      setStatus(undefined);
    }
  };

  const emailValue = form.watch('email');

  useEffect(() => {
    if (form.getFieldState('email').isTouched) {
      setStatus(undefined);
      setMessage(undefined);
    }
  }, [emailValue, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-full flex-col justify-center space-y-8"
      >
        <EmailField
          placeholder="Enter your email"
          autoComplete="email webauthn"
          control={form.control}
          name="email"
          label="Email"
        />
        {message && <FormBanner message={message} />}
        <SubmitButton status={status}>Submit</SubmitButton>
      </form>
    </Form>
  );
}
