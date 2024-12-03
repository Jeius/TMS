import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import EmailForm from '@/features/auth/forgot-password/components/email-form';

export default function ForgotPassword() {
  return (
    <main className="min-h-[calc(100vh-4rem)] p-5 sm:p-10">
      <Card variant="glass" className="mx-auto max-w-[480px] sm:p-5">
        <CardHeader>
          <h1 className="text-2xl font-medium">Forgot Password</h1>
          <CardDescription>
            Enter your email and a link will be sent to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmailForm />
        </CardContent>
      </Card>
    </main>
  );
}
