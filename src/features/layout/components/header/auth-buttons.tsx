import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AuthButtons() {
    return (
        <div className="flex items-center sm:pl-5 space-x-2">
            <Button asChild>
                <Link href="/login?signUp=true">Sign up</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
                <Link href="/login">Sign in</Link>
            </Button>
        </div>
    )
}
