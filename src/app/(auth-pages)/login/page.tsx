import { Account } from '@/components/animated/account';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SignIn from '@/features/auth/login/components/sign-in';
import SignUp from '@/features/auth/login/components/sign-up';
import Link from 'next/link';
import { Suspense } from 'react';

function SignUpTab() {
    return (
        <>
            <CardHeader>
                <CardTitle className="text-2xl font-medium">Create account</CardTitle>
                <CardDescription className="text-foreground">
                    Already have an account?{' '}
                    <Link className="text-secondary/80 font-semibold hover:text-secondary" href="/login">
                        Sign in
                    </Link>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <SignUp />
            </CardContent>
        </>
    );
}

function SignInTab() {
    return (
        <>
            <CardHeader>
                <CardTitle className="text-2xl">Welcome!</CardTitle>
                <CardDescription className='text-foreground [&:not(:first-child)]:mt-6'>
                    Please enter your email and password to sign in.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <SignIn />
            </CardContent>
        </>
    );
}

export default async function Login() {
    return (
        <main className="p-5 sm:p-10 min-h-[85vh]">
            <Card variant="glass" className="mx-auto max-w-[480px] sm:p-5">
                <div className="w-full m-auto overflow-hidden p-5 pb-0">
                    <Suspense>
                        <Account firstTab={<SignInTab />} secondTab={<SignUpTab />} />
                    </Suspense>
                </div>
            </Card>
        </main >
    )
}

