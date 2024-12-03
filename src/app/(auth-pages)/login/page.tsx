import { Account } from '@/components/animated/account';
import { Card } from '@/components/ui/card';
import SignIn from '@/features/auth/login/components/sign-in';
import SignUp from '@/features/auth/login/components/sign-up';
import { Suspense } from 'react';

export default async function Login() {
  return (
    <main className="min-h-[calc(100vh-4rem)] p-5 sm:p-10">
      <Card variant="glass" className="mx-auto max-w-[480px] sm:p-5">
        <div className="m-auto w-full overflow-hidden p-5 pb-0">
          <Suspense>
            <Account firstTab={<SignIn />} secondTab={<SignUp />} />
          </Suspense>
        </div>
      </Card>
    </main>
  );
}
