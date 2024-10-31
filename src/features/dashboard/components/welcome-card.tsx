'use client'

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { accountLinks } from '@/lib/navigation-links';
import { signOutAction } from '@/server/actions/auth';
import { LogOutIcon } from 'lucide-react';
import Link from 'next/link';

export default function WelcomeCard() {
    return (
        <Card id="welcome-card" variant="gradient"
            aria-labelledby="dashboard-welcome"
            className="w-full bg-primary"
        >
            <CardHeader className="space-y-1">
                <CardTitle id='dashboard-welcome' className="font-bold text-3xl text-secondary">
                    Welcome, [user]
                </CardTitle>
                <CardDescription>
                    Role: [role]
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-wrap justify-end pt-4 gap-2">
                {accountLinks.map(({ label, href, icon: Icon }) => (
                    <div key={label} className='flex items-center space-x-1'>
                        <Button asChild
                            variant="link"
                            size="sm"
                            className="size-min p-1 text-card-foreground flex items-center space-x-2 font-semibold">
                            <Link href={href} >
                                <span>{label}</span>
                                <Icon aria-hidden="true" focusable="false" size='1rem' />
                            </Link>
                        </Button>

                        <Separator orientation="vertical" className="h-4 bg-primary-foreground/60" />
                    </div>
                ))}
                <Button size="sm" variant="link" aria-label='Sign out'
                    className="size-min p-1 text-card-foreground flex items-center space-x-2 font-semibold"
                    onClick={async () => await signOutAction()}
                >
                    <span>Sign out</span>
                    <LogOutIcon aria-hidden="true" focusable="false" size='1rem' />
                </Button>
            </CardFooter>
        </Card>
    )
}
