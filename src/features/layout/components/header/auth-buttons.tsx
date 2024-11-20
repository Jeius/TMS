'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AuthButtons() {
  const pathName = usePathname();

  return (
    <div className="flex items-center space-x-2 sm:pl-5">
      <Button size="sm" asChild>
        <Link href={`/login?redirect_to=${pathName}&signUp=true`}>Sign up</Link>
      </Button>
      <Button variant="outline" size="sm" asChild>
        <Link href={`/login?redirect_to=${pathName}`}>Sign in</Link>
      </Button>
    </div>
  );
}
