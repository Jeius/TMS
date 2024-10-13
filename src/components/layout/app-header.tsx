
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';
import AppMenu from './app-menu';
import { Bell, Search } from 'lucide-react';
import { TooltipProvider, TooltipWrapper } from "@/components/ui/tooltip";
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '../ui/dropdown-menu';


const UserMenu = () => (
    <DropdownMenu>
        <TooltipWrapper label="Account" className="mr-3">
            <DropdownMenuTrigger asChild>
                <Button
                    id="user-avatar"
                    aria-label="Account"
                    className="size-fit p-0 rounded-full border-2 border-primary"
                    variant="outline"
                >
                    <Avatar className="size-9">
                        <AvatarImage
                            src="https://github.com/jeius.png"
                            alt="User Avatar"
                            className="transition-all duration-150 filter-none hover:brightness-150"
                        />
                        <AvatarFallback>
                            <Skeleton />
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
        </TooltipWrapper>

        <DropdownMenuContent id="user-menu-dropdown" className="z-[120] mr-1">
            {["Profile", "User Management", "Settings", "Logout"].map((item, index) => (
                <DropdownMenuItem key={index}>
                    <Link href={`/${item.toLowerCase().replace(' ', '-')}`}>{item}</Link>
                </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
    </DropdownMenu>
);

const NotificationMenu = () => {
    const notifications = [
        'Notification 1',
        'Notification 2',
        'Notification 3',
        'Notification 4',
        'Notification 5',
    ];

    return (
        <DropdownMenu>
            <TooltipWrapper label="Notifications">
                <DropdownMenuTrigger asChild>
                    <Button
                        id="notification-button"
                        className="rounded-full size-fit p-2 text-foreground"
                        variant="ghost"
                        aria-label="Open Notifications"
                    >
                        <Bell className="size-5" />
                    </Button>
                </DropdownMenuTrigger>
            </TooltipWrapper>

            <DropdownMenuContent id="notification-dropdown" className="z-[2000] mr-1">
                {notifications.map((notification, index) => (
                    <DropdownMenuItem key={index}>
                        <Link href="#">{notification}</Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const SearchBar = () => (
    <>
        <Input
            id="search-input"
            className="hidden sm:block max-w-[250px] md:min-w-[250px]"
            type="search"
            placeholder="Search..."
            aria-label="Search through site content"
        />
        <TooltipWrapper label="Search">
            <Button
                id="search-button"
                className="sm:hidden rounded-full size-fit p-2 text-foreground"
                variant="ghost"
                aria-label="Search button"
            >
                <Search className="size-5" />
            </Button>
        </TooltipWrapper>
    </>
);

export default function AppHeader() {
    return (
        <header id="app-header" className="sticky inset-x-0 top-0 z-50 border-b bg-card/30 dark:bg-black/40 backdrop-blur-md p-2 lg:px-4">
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
                            <h1 className="hidden lg:block">Thesis Management System</h1>
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
