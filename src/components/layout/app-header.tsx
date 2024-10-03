
import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from '../ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '../ui/dropdown-menu';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Bell, Search } from 'lucide-react';
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';
import Image from 'next/image';
import AppMenu from './app-menu';

export default function AppHeader() {
    return (
        <header className="sticky inset-x-0 top-0 z-[100] border-b bg-card p-2 lg:px-4">
            <div className="flex items-center">
                <div className="flex grow items-center space-x-2 pl-2">
                    <div className="block lg:hidden"><AppMenu /></div>

                    <Link href={"/"} className="flex items-center space-x-2 font-semibold text-lg w-fit">
                        <Image
                            src={`/images/msuiit-logo-275x280.png`}
                            alt='IIT'
                            width={40}
                            height={40}
                            aria-hidden
                        />
                        <span className="sr-only">Go to Homepage</span>
                        <h1 className="hidden lg:block">Thesis Management System</h1>
                    </Link>
                </div>
                <div className="flex items-center space-x-2 pl-2">
                    <Input
                        className="hidden sm:block max-w-[250px] md:min-w-[250px]"
                        type="search"
                        placeholder="Search..." />

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    className="sm:hidden rounded-full size-fit p-2 text-foreground"
                                    variant={"ghost"}
                                    aria-label="Search button"
                                >
                                    <Search aria-hidden className="size-5" />
                                    <span className='sr-only'>Search</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Search</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <Notifications />

                    <User />
                </div>
            </div>
        </header>
    )
}


function User() {
    return (
        <TooltipProvider>
            <DropdownMenu>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                            <Button className="size-fit p-0 rounded-full border-2 border-primary" variant="outline">
                                <Avatar className="size-9">
                                    <AvatarImage
                                        src="https://github.com/jeius.png"
                                        alt="@user"
                                        className="transition-all duration-150 filter-none hover:brightness-150"
                                    />
                                    <AvatarFallback>
                                        <Skeleton />
                                    </AvatarFallback>
                                </Avatar>
                                <span className='sr-only'>Account</span>
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent className="mr-4">
                        <p>Account</p>
                    </TooltipContent>
                </Tooltip>

                <DropdownMenuContent className="z-[120] mr-1">
                    <DropdownMenuItem>
                        <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/user-management">User Management</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/logout">Logout</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </TooltipProvider>
    )
}

function Notifications() {
    const links = [
        { href: '#', label: 'Notification 1' },
        { href: '#', label: 'Notification 2' },
        { href: '#', label: 'Notification 3' },
        { href: '#', label: 'Notification 4' },
        { href: '#', label: 'Notification 5' },
    ];
    return (
        <TooltipProvider>
            <DropdownMenu>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                            <Button className="rounded-full size-fit p-2 text-foreground" variant="ghost">
                                <Bell aria-hidden className="size-5" />
                                <span className='sr-only'>Open Notifications</span>
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Notifications</p>
                    </TooltipContent>
                </Tooltip>

                <DropdownMenuContent className="z-[2000] mr-1">
                    {links.map((link, index) => (
                        <DropdownMenuItem key={index}>
                            <Link href={link.href}>{link.label}</Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </TooltipProvider>

    )
}

