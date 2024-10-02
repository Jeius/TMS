"use client"

import {
    BookCopy,
    BookOpenCheck,
    CalendarDays,
    ChartLine,
    FilePlus2,
    House,
    Library,
    MessageCircle,
    MoonIcon,
    Search,
    SunIcon,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'

const primaryLinks = [
    { href: '/', label: 'Home', icon: <House /> },
    { href: '/browse', label: 'Browse', icon: <Search /> },
];

const secondaryLinks = [
    { href: '/my-library', label: 'My Library', icon: <Library /> },
    { href: '/upload', label: 'Upload', icon: <FilePlus2 /> },
    { href: '/borrow', label: 'Borrow', icon: <BookCopy /> },
    { href: '/schedule', label: 'Schedule', icon: <CalendarDays /> },
    { href: '/messages', label: 'Messages', icon: <MessageCircle /> },
];

const toolLinks = [
    { href: '/analytics', label: 'Analytics', icon: <ChartLine /> },
    { href: '/plagiarism-tool', label: 'Plagiarism Checker', icon: <BookOpenCheck /> },
];

const links = [
    primaryLinks, secondaryLinks, toolLinks
]

export default function NavigationSideBar() {
    const [canExpand, setCanExpand] = React.useState(false)
    const pathname = usePathname();

    const highlightLabel = (label: string) => {
        if (pathname === "/" && label === "Home")
            return "bg-primary text-primary-foreground"
        if (pathname.substring(1) === label.toLowerCase())
            return "bg-primary text-primary-foreground"
        return "hover:bg-accent"
    }

    return (
        <div
            id="navigation-sidebar"
            className={`fixed inset-y-0 left-0 z-[1000] hidden lg:flex flex-col justify-start items-center overflow-x-hidden border-r bg-background shadow-md transition-all duration-150 overflow-y-auto pb-16 scroll-bar-hidden pt-20 ${canExpand ? 'w-60' : 'w-16'}`}
            onMouseEnter={() => setCanExpand(true)}
            onMouseLeave={() => setCanExpand(false)}
            onFocus={() => setCanExpand(true)}
            onBlur={() => setCanExpand(false)}
        >
            <div className="flex grow flex-col w-full items-center justify-start gap-1 lg:px-3">
                {links.map((link, index) => (
                    <React.Fragment key={index}>
                        {link.map(subLink => (
                            <Link
                                key={subLink.href}
                                href={subLink.href}
                                data-test-id="sidebar-home"
                                className={`flex w-full items-center justify-start relative rounded-md whitespace-nowrap font-medium ${highlightLabel(subLink.label)}`}
                            >
                                <div className="flex size-9 p-2 shrink-0 items-center justify-center">
                                    {subLink.icon}
                                </div>
                                {canExpand && <span
                                    className={`pr-4 text-sm transition-all duration-150`}
                                >
                                    {subLink.label}
                                </span>}
                            </Link>
                        ))}

                        {index !== links.length - 1 && <Separator orientation="horizontal" />}
                    </React.Fragment>
                ))}
            </div>

            <div className="flex flex-col w-full items-start justify-center gap-1 lg:px-3">
                <Separator orientation="horizontal" />
                <ThemeSwitch canExpand={canExpand} />
            </div>
        </div>
    )
}


function ThemeSwitch({ canExpand }: { canExpand: boolean }) {
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

            {canExpand && <div>
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