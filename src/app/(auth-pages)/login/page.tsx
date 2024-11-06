import { Account } from '@/components/animated/account';
import { Card } from '@/components/ui/card';
import SignIn from '@/features/auth/login/components/sign-in';
import SignUp from '@/features/auth/login/components/sign-up';
import { Suspense } from 'react';


export default async function Login() {
    return (
        <main className="p-5 sm:p-10 min-h-[85vh]">
            <Card variant="glass" className="mx-auto max-w-[480px] sm:p-5">
                <div className="w-full m-auto overflow-hidden p-5 pb-0">
                    <Suspense>
                        <Account firstTab={<SignIn />} secondTab={<SignUp />} />
                    </Suspense>
                </div>
            </Card>
        </main >
    )
}

