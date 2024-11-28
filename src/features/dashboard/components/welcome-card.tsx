import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { accountLinks } from '@/lib/navigation-links';
import Link from 'next/link';
import { Suspense } from 'react';
import LogoutButton from './logout-button';
import WelcomeHeader from './welcome-header';

function HeaderSkeleton() {
  return (
    <CardHeader className="space-y-1">
      <div className="flex gap-2 text-3xl font-bold leading-none tracking-tight text-secondary">
        <span>Welcome, </span>
        <Skeleton className="h-8 w-20 bg-secondary dark:bg-secondary" />
      </div>
      <Skeleton className="h-6 w-32" />
    </CardHeader>
  );
}

export default function WelcomeCard() {
  return (
    <Card
      id="welcome-card"
      variant="gradient"
      aria-labelledby="dashboard-welcome"
      className="w-full bg-primary"
    >
      <Suspense fallback={<HeaderSkeleton />}>
        <WelcomeHeader />
      </Suspense>
      <CardFooter className="flex flex-wrap justify-end gap-2 pt-4">
        {accountLinks.map(({ label, href, icon: Icon }) => (
          <div key={label} className="flex items-center space-x-1">
            <Button
              asChild
              variant="link"
              size="sm"
              className="flex size-min items-center space-x-2 p-1 font-semibold text-card-foreground"
            >
              <Link href={href}>
                <span>{label}</span>
                <Icon aria-hidden="true" focusable="false" size="1rem" />
              </Link>
            </Button>

            <Separator
              orientation="vertical"
              className="h-4 bg-primary-foreground/60"
            />
          </div>
        ))}
        <LogoutButton />
      </CardFooter>
    </Card>
  );
}
