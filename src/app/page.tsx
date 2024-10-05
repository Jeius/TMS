
import React from 'react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import QuickActions from './quick-actions';
import Announcements from './announcements';
import AppCalendar from './app-calendar';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';

// Array of account links for easy modification and mapping.
const accountLinks = [
    { href: "#", label: "Profile" },
    { href: "#", label: "Account Management" },
    { href: "#", label: "Logout" },
];

// Component to render account links within a card footer.
const AccountLinks = () => (
    <CardFooter className="flex flex-wrap justify-end space-x-1 text-primary-foreground">
        {accountLinks.map((link, index) => (
            <div key={index} className='flex space-x-1 items-center'>
                <Link
                    href={link.href}
                    className="text-sm font-semibold no-underline underline-offset-2 hover:underline"
                >
                    {link.label}
                </Link>
                {/* Separator for visual division between links */}
                {index !== accountLinks.length - 1 && (
                    <Separator orientation="vertical" className="h-4 bg-primary-foreground/70" />
                )}
            </div>
        ))}
    </CardFooter>
);

export default function Home() {
    return (
        <div id="home-page"
            className="relative flex max-w-none mx-auto justify-center lg:justify-start p-5 space-x-10"
        >
            {/* Main card section */}
            <div className="flex flex-col w-fit items-center lg:ml-[max(40px,calc(50%-44rem))] space-y-16">
                {/* Welcome Card */}
                <Card id="welcome-card" className="w-full bg-primary">
                    <CardHeader className="space-y-1">
                        <CardTitle className="font-bold text-3xl text-secondary">
                            Welcome, [user]
                        </CardTitle>
                        <CardDescription className="text-primary-foreground">
                            Role: [role]
                        </CardDescription>
                    </CardHeader>
                    <AccountLinks />
                </Card>

                <QuickActions />
            </div>

            {/* Sidebar section visible only on large screens */}
            <div id="sidebar" className="hidden lg:flex fixed top-[60px] right-0 bottom-0">
                <ScrollArea>
                    <div className="flex flex-col space-y-5 px-7 py-5">
                        <Announcements className="grow transition-all duration-500" />
                        <AppCalendar />
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
