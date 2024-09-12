import React from 'react';
import { Departmentbox } from './departmentbox';
import Link from 'next/link';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { NextPage } from 'next';
import ThemeSwitch from './themeswitch';

type NavbarProps = {
    selected?: string;
};

const Navbar: NextPage<NavbarProps> = ({ selected = 'dashboard' }) => {
    const links = [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/browse', label: 'Browse' },
        { href: '/borrow', label: 'Borrow' },
        { href: '/upload', label: 'Upload' },
    ];

    return (
        <nav className="flex flex-row items-center p-5 gap-10 h-[70px] justify-between border-b bg-card">
            <ul className="flex flex-row gap-10 font-semibold items-center">
                <Departmentbox />
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={selected === link.label.toLowerCase() ? '' : 'hover:text-black dark:hover:text-white text-zinc-600 dark:text-zinc-400'}
                    >
                        {link.label}
                    </Link>
                ))}
            </ul>
            <div className="flex flex-row gap-5 w-full justify-end items-center max-w-[400px]">
                <Input className="min-w-[100px]" type="search" placeholder="Search..." />
                <ThemeSwitch />
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </nav>
    );
};

export default Navbar;
