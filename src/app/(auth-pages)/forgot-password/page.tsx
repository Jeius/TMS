import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EmailForm from './email-form';

export default function ForgotPassword() {
    return (
        <main className="p-5 sm:p-10">
            <Card variant="glass" className="mx-auto max-w-[480px] sm:p-5" >
                <CardHeader>
                    <CardTitle>Forgot Password</CardTitle>
                    <CardDescription>Enter your email and a link will be sent to reset your password.</CardDescription>
                </CardHeader>
                <CardContent>
                    <EmailForm />
                </CardContent>
            </Card>
        </main>
    )
}
