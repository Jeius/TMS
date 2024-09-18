"use client"
import React from 'react';
import Link from 'next/link';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { NextPage } from 'next';
import ThemeSwitch from './theme-switch';
import { Skeleton } from './ui/skeleton';
import { useDeviceSize } from '@/lib/hooks';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import DropdownNav from './dropdown-nav';
import { cn } from '@/lib/utils';

type NavbarProps = {
    selected?: string
};

const screens = {
    'sm': 640,
    'md': 768,
    'lg': 1024,
    'xl': 1280,
    '2xl': 1536,
}

export default function Navbar({ selected = 'dashboard' }: NavbarProps) {
    const windowSize = useDeviceSize();

    const links = [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/browse', label: 'Browse' },
        { href: '/borrow', label: 'Borrow' },
        { href: '/upload', label: 'Upload' },
    ];

    return (
        <nav className="flex flex-row items-center p-5 gap-10 h-[70px] justify-between border-b bg-card">
            <ul className="flex flex-row gap-10 font-semibold items-center">
                {windowSize.width >= screens["md"]
                    ? links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(selected === link.label.toLowerCase()
                                ? 'text-foreground'
                                : 'hover:text-foreground text-muted-foreground',
                                "outline outline-none rounded-sm focus-visible:outline-ring"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))
                    : <DropdownNav links={links} />}
            </ul>
            <div className="flex flex-row gap-2 lg:gap-5 w-full justify-end items-center max-w-[400px]">
                {windowSize.width >= screens["sm"]
                    ? <Input className="max-w-[250px] lg:max-w-none md:min-w-[250px]" type="search" placeholder="Search..." />
                    : <Button variant={"ghost"} aria-label="Search button" className="rounded-full size-fit p-2 text-foreground">
                        <Search />
                    </Button>}
                <ThemeSwitch />
                <Avatar>
                    <AvatarImage src="https://github.com/jeius.png" alt="@shadcn" />
                    <AvatarFallback>
                        <Skeleton />
                    </AvatarFallback>
                </Avatar>
            </div>
        </nav>
    );
};

