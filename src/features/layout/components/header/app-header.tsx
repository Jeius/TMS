'use client'

import { TooltipProvider } from '@/components/ui/tooltip';
import NavigationMenu from '@/features/layout/components/header/navigation-menu';
import useAuthListener from '@/lib/hooks/use-auth-listener';
import Image from 'next/image';
import Link from 'next/link';
import AuthButtons from './auth-buttons';
import NotificationMenu from './notification-menu';
import SearchBar from './searchbar';
import UserMenu from './user-menu';

function LogoTitle() {
    return (
        <Link href="/" id="thesis-management-system"
            aria-label='Go to homepage'
            className="flex items-center space-x-2 font-semibold text-lg"
        >
            <Image
                src={'/images/msuiit-logo-275x280.png'}
                alt="MSU-IIT Seal of Excellence"
                width={275}
                height={280}
                role='img'
                className='size-12 shrink-0'
            />
            <h1 className="sr-only lg:not-sr-only">Thesis Management System</h1>
        </Link>
    );
}

export default function AppHeader() {
    const { isMounted, isSignedIn } = useAuthListener();

    return (
        <TooltipProvider>
            <header id="app-header"
                className="sticky inset-x-0 top-0 z-50 border-b bg-card/70 backdrop-blur-lg shadow p-2 lg:px-5"
            >
                <div className="flex items-center justify-between">
                    <div className="flex grow items-center">
                        <NavigationMenu />
                        <LogoTitle />
                    </div>
                    <div className="flex items-center space-x-1">
                        <SearchBar />
                        {isMounted && (isSignedIn
                            ? <>
                                <NotificationMenu />
                                <UserMenu />
                            </>
                            : <AuthButtons />)}
                    </div>
                </div>
            </header>
        </TooltipProvider>
    );
}
