import { Button } from '@/components/ui/button';
import { supabaseServerClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function AuthButtons() {
    const supabase = await supabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (!user &&
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
