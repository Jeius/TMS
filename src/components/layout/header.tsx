"use client"

import { useDeviceSize } from '@/hooks/use-device-size';
import { screens } from '@/lib/utils';
import { Bell, Search } from 'lucide-react';
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

export default function AppHeader() {
    const deviceSize = useDeviceSize();

    return (
        <header className="sticky inset-x-0 top-0 z-[1300] border-b bg-card p-2 lg:px-4">
            <div className="flex items-center">
                <div className="flex grow items-center space-x-2 pl-2">
                    <Link href={"/"} className="font-semibold text-lg w-fit ">
                        Thesis Management System
                    </Link>
                </div>
                <div className="flex items-center space-x-2 pl-2">
                    {deviceSize.width >= screens["sm"]
                        ? <Input
                            className="max-w-[250px] md:min-w-[250px]"
                            type="search"
                            placeholder="Search..." />
                        : <Button
                            className="rounded-full size-fit p-2 text-foreground"
                            variant={"ghost"}
                            aria-label="Search button">
                            <Search />
                        </Button>}

                    <Notifications />

                    <User />
                </div>
            </div>
        </header>
    )
}


function User() {
    return (
        <DropdownMenu>
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
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-[2000] mr-1">
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
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="size-fit p-0 rounded-full" variant="ghost">
                    <div className="flex size-9 p-2 shrink-0 items-center justify-center"><Bell /></div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-[2000] mr-1">
                {links.map(link => (
                    <DropdownMenuItem>
                        <Link href={link.href}>{link.label}</Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}