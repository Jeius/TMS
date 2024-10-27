import { Account } from "@/components/animated/account";
import SignIn from "@/components/auth/sign-in";
import SignUp from "@/components/auth/sign-up";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

function SignUpTab() {
    return (
        <Card className="size-full min-w-80 m-auto">
            <CardHeader>
                <h1 className="text-2xl font-medium">Sign up</h1>
                <p className="text-sm text text-foreground">
                    Already have an account?{" "}
                    <Link className="text-secondary font-medium underline" href="/sign-in">
                        Sign in
                    </Link>
                </p>
            </CardHeader>
            <CardContent>
                <SignUp />
            </CardContent>
        </Card>
    );
}

function SignInTab() {
    return (
        <Card className="size-full min-w-80 m-auto">
            <CardHeader>
                <h1 className="text-2xl font-medium">Sign in</h1>
            </CardHeader>
            <CardContent>
                <SignIn />
            </CardContent>
        </Card>
    );
}

export default function Login() {
    return (
        <main className="size-full p-5">
            <div className="mx-auto w-min">
                <Account firstTab={<SignInTab />} secondTab={<SignUpTab />} />
            </div>
        </main >
    )
}

