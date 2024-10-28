import { Account } from '@/components/animated/account';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import SignIn from './_components/sign-in';
import SignUp from './_components/sign-up';

function SignUpTab() {
    return (
        <>
            <CardHeader>
                <h1 className="text-2xl font-medium">Sign Up</h1>
                <p className="text-sm text text-foreground">
                    Already have an account?{' '}
                    <Link className="text-secondary font-medium underline" href="/login">
                        Sign in
                    </Link>
                </p>
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
                <h1 className="text-2xl font-medium">Sign In</h1>
                <p className="text-sm text text-foreground">
                    Don`&apos;`t have an account?{' '}
                    <Link className="text-secondary font-medium underline" href="/login?signUp=true">
                        Sign up
                    </Link>
                </p>
            </CardHeader>
            <CardContent>
                <SignIn />
            </CardContent>
        </>
    );
}

export default async function Login() {
    return (
        <main className="p-5 sm:p-10">
            <Card variant="glass" className="mx-auto max-w-[480px] sm:p-5">
                <div className="w-full m-auto overflow-hidden p-5 pb-0">
                    <Account firstTab={<SignInTab />} secondTab={<SignUpTab />} />
                </div>
            </Card>
        </main >
    )
}

