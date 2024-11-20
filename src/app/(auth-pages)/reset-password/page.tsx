import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ConfirmForm from '@/features/auth/reset-password/components/confirm-form';
import { Suspense } from 'react';

export default function ForgotPassword() {
  return (
    <main className="min-h-[85vh] p-5 sm:p-10">
      <Card variant="glass" className="mx-auto max-w-[480px] sm:p-5">
        <CardHeader>
          <h1 className="text-2xl font-medium">Reset Password</h1>
        </CardHeader>
        <CardContent>
          <Suspense>
            <ConfirmForm />
          </Suspense>
        </CardContent>
      </Card>
    </main>
  );
}
