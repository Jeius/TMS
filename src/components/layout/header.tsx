"use client"

import { useDeviceSize } from '@/hooks/use-device-size';
import { screens } from '@/lib/utils';
import { MoonIcon, Search, SunIcon } from 'lucide-react';
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';

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
                    <ThemeSwitch />
                    <User />
                </div>
            </div>
        </header>
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