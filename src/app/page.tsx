
import React from 'react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import QuickActions from './quick-actions';
import Announcements from './announcements';
import HomeCalendar from './home-calendar';
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
const AccountLinks = () => {
    return accountLinks.map((link, index) => (
        <div key={index} className='flex space-x-1 items-center'>
            <Link
                href={link.href}
                className="text-sm font-semibold no-underline underline-offset-2 hover:underline"
            >
                {link.label}
            </Link>
            {/* Separator for visual division between links */}
            {index !== accountLinks.length - 1 && (
                <Separator orientation="vertical" className="h-4" />
            )}
        </div>
    ))
};

export default function Home() {
    return (
        <div id="home-page"
            className="relative max-w-none m-auto p-5"
        >
            <div className="flex flex-col mx-auto w-fit items-center md:items-start lg:ml-[max(40px,calc(65%-37rem))] xl:ml-[max(40px,calc(57%-40rem))] 2xl:ml-[max(40px,calc(50%-44rem))] space-y-16 transition-all duration-500">
                <Card id="welcome-card" filter="glass" colorType="gradient" className="w-full bg-primary">
                    <CardHeader className="space-y-1">
                        <CardTitle className="font-bold text-3xl text-secondary">
                            Welcome, [user]
                        </CardTitle>
                        <CardDescription>
                            Role: [role]
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex flex-wrap justify-end space-x-1">
                        <AccountLinks />
                    </CardFooter>
                </Card>

                <QuickActions />

                {/* Sidebar section visible only on large screens */}
                <aside id="sidebar" className="relative lg:p-5 lg:fixed lg:top-0 lg:bottom-0 lg:right-0">
                    <ScrollArea className="size-full inset-y-0 pr-0 lg:pr-5">
                        <div className="flex flex-col space-y-16 lg:space-y-5">
                            <Announcements className="grow transition-all duration-500" />
                            <HomeCalendar />
                        </div>
                    </ScrollArea>
                </aside>

                <div className="flex flex-col items-start space-y-2 justify-center">
                    <h2 className="font-semibold text-lg pl-2">Progress</h2>
                    <p>Gantt chart here...</p>
                </div>

                <div className="flex flex-col items-start space-y-2 justify-center">
                    <h2 className="font-semibold text-lg pl-2">Recent Activities</h2>
                    <p>A feed showing what`&apos;`s happening in the system relevant to the user.</p>
                </div>
            </div>
        </div>
    );
}
