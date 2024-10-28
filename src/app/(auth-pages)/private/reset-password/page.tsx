import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ConfirmForm from './confirm-form';

export default function ForgotPassword() {
    return (
        <main className="p-5 sm:p-10">
            <Card variant="glass" className="mx-auto max-w-[480px] sm:p-5" >
                <CardHeader>
                    <h1 className="text-2xl font-medium">Reset Password</h1>
                </CardHeader>
                <CardContent>
                    <ConfirmForm />
                </CardContent>
            </Card>
        </main>
    )
}