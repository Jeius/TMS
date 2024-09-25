"use client"
import React from 'react';
import Link from 'next/link';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';
import { useDeviceSize } from '@/hooks/use-device-size';
import { Button } from '../ui/button';
import { cn, screens } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { MenuIcon, MoonIcon, Search, SunIcon } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type LinkConfig = {
    href: string
    label: string
}

export default function NavigationBar() {
    const deviceSize = useDeviceSize();
    const pathname = usePathname();

    const links = [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/browse', label: 'Browse' },
        { href: '/borrow', label: 'Borrow' },
        { href: '/upload', label: 'Upload' },
    ];

    const highlightLabel = (label: string) => {
        if (pathname.substring(1) === label.toLowerCase())
            return "text-foreground"

        if (pathname === "/" && label === "Dashboard")
            return "text-foreground"

        return "hover:text-foreground text-muted-foreground"
    }

    return (
        <nav className="flex flex-row items-center p-5 gap-10 h-[70px] w-full justify-between border-b bg-card">
            <ul className="flex flex-row gap-10 font-semibold items-center">
                {deviceSize.width >= screens["md"]
                    ? links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(highlightLabel(link.label),
                                "outline outline-none rounded-sm focus-visible:outline-ring"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))
                    : <DropdownNav links={links} />}
            </ul>
            <div className="flex flex-row gap-2 lg:gap-5 w-full justify-end items-center max-w-[400px]">
                {deviceSize.width >= screens["sm"]
                    ? <Input
                        className="max-w-[250px] lg:max-w-none md:min-w-[250px]"
                        type="search"
                        placeholder="Search..." />
                    : <Button
                        className="rounded-full size-fit p-2 text-foreground"
                        variant={"ghost"}
                        aria-label="Search button">
                        <Search />
                    </Button>}
                <ThemeSwitch />
                <User />
            </div>
        </nav>
    );
};

function DropdownNav(props: { links: LinkConfig[] }) {
    const { links } = props
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className="text-foreground"
                    variant="outline">
                    <MenuIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col w-56">
                {links.map((link) => (
                    <DropdownMenuItem
                        key={link.href}
                        className="hover:bg-accent"
                        asChild>
                        <Link href={link.href} className="size-full">{link.label}</Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function ThemeSwitch() {
    const [dark, setDark] = React.useState(false)

    React.useEffect(() => {
        const theme = localStorage.getItem("theme")
        if (theme?.toLowerCase() === "dark") setDark(true)
    }, [])

    React.useEffect(() => {
        if (dark) {
            localStorage.setItem("theme", "dark")
        } else {
            localStorage.setItem("theme", "light")
        }
    }, [dark])

    const toggleCallback = () => {
        setDark(!dark)
        document.documentElement.classList.toggle('dark')
    }

    return (
        <Button
            className='size-fit p-2 rounded-full text-foreground'
            variant='ghost'
            aria-label="Toggle theme"
            onClick={toggleCallback}>
            {dark ? <MoonIcon /> : <SunIcon />}
        </Button>
    )
}

function User() {
    return (
        <Avatar>
            <AvatarImage src="https://github.com/jeius.png" alt="@user" />
            <AvatarFallback>
                <Skeleton />
            </AvatarFallback>
        </Avatar>
    )
}