import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AppMenu from './header/app-menu';
import { TooltipProvider } from "@/components/ui/tooltip";
import NotificationMenu from './header/notification-menu';
import UserMenu from './header/user-menu';
import SearchBar from './header/searchbar';

export default function AppHeader() {
    return (
        <header id="app-header" className="sticky inset-x-0 top-0 z-50 border-b bg-card/30 dark:bg-black/40 backdrop-blur-md shadow p-2 lg:px-4">
            <TooltipProvider>
                <div className="flex items-center justify-between">
                    <div className="flex grow items-center space-x-2 pl-2">
                        <div id="navigation-menu" className="block lg:hidden">
                            <AppMenu />
                        </div>
                        <Link
                            id="app-title"
                            href="/"
                            className="flex items-center space-x-2 font-semibold text-lg w-fit"
                        >
                            <Image
                                src={`/images/msuiit-logo-275x280.png`}
                                alt='IIT Logo'
                                width={40}
                                height={40}
                                aria-hidden="true"
                            />
                            <h1 className="hidden md:block">Thesis Management System</h1>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-2 pl-2">
                        <SearchBar />
                        <NotificationMenu />
                        <UserMenu />
                    </div>
                </div>
            </TooltipProvider>
        </header>
    );
}
