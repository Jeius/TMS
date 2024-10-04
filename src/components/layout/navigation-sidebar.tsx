"use client"

import { MoonIcon, SunIcon, } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { navigationLinks } from '@/lib/navigation-links'
import { ScrollArea } from '../ui/scroll-area'


export default function NavigationSideBar() {
    const [canExpand, setCanExpand] = React.useState(false)

    return (
        <div
            id="navigation-sidebar"
            className={`fixed inset-y-0 left-0 z-[99] hidden lg:flex flex-col justify-start items-center overflow-x-hidden border-r bg-background shadow-md transition-all duration-150 overflow-y-auto pb-10 scroll-bar-hidden pt-20 ${canExpand ? 'w-60' : 'w-16'}`}
            onMouseEnter={() => setCanExpand(true)}
            onMouseLeave={() => setCanExpand(false)}
            onFocus={() => setCanExpand(true)}
            onBlur={() => setCanExpand(false)}
        >
            <NavigationItems showLabels={canExpand} />

            <div className="flex flex-col w-full items-start justify-center lg:px-3">
                <Separator className='my-1' orientation="horizontal" />
                <ThemeSwitch showLabel={canExpand} />
            </div>
        </div>
    )
}

export function NavigationItems({ showLabels = true }: { showLabels?: boolean }) {
    const pathname = usePathname();

    const highlightLabel = (label: string) => {
        if (pathname === "/" && label === "Home")
            return "bg-primary text-secondary"
        if (pathname.substring(1) === label.toLowerCase())
            return "bg-primary text-secondary"
        return "hover:bg-accent"
    }

    return (
        <ScrollArea className="flex grow flex-col w-full items-center justify-start gap-1 lg:px-3">
            {navigationLinks.map((link, index) => (
                <React.Fragment key={index}>
                    {link.map(subLink => (
                        <Link
                            key={subLink.href}
                            href={subLink.href}
                            data-test-id="sidebar-home"
                            className={`flex w-full items-center justify-start relative rounded-md whitespace-nowrap font-medium ${highlightLabel(subLink.label)}`}
                        >
                            <div aria-hidden className="flex size-9 p-2 shrink-0 items-center justify-center">
                                {subLink.icon}
                            </div>
                            {showLabels && <span
                                className="pr-4 text-sm pointer-events-none"
                            >
                                {subLink.label}
                            </span>}
                        </Link>
                    ))}

                    {index !== navigationLinks.length - 1 && <Separator className='my-1' orientation="horizontal" />}
                </React.Fragment>
            ))}
        </ScrollArea>
    )
}


function ThemeSwitch({ showLabel }: { showLabel: boolean }) {
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
            className='flex p-0 w-full items-center justify-start relative rounded-md whitespace-nowrap font-medium'
            variant='ghost'
            aria-label="Toggle theme"
            onClick={toggleCallback}>

            <div className="flex size-9 p-2 shrink-0 items-center justify-center">
                {!dark ? <SunIcon /> : <MoonIcon />}
            </div>

            {showLabel && <div>
                {!dark
                    ? <span className={`pr-4 text-sm transition-all duration-150`}>
                        Light Mode
                    </span>
                    : <span className={`pr-4 text-sm transition-all duration-150`}>
                        Dark Mode
                    </span>}
            </div>}

        </Button>
    )
}