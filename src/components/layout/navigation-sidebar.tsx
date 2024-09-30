"use client"

import { HomeIcon } from '@radix-ui/react-icons'
import { BookOpen, ChartArea, LucideBookPlus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

const links = [
    { href: '/', label: 'Home', icon: <HomeIcon /> },
    { href: '/dashboard', label: 'Dashboard', icon: <ChartArea /> },
    { href: '/borrow', label: 'Borrow', icon: <BookOpen /> },
    { href: '/upload', label: 'Upload', icon: <LucideBookPlus /> },
];

export default function NavigationSideBar() {
    const [isHovered, setIsHovered] = useState(false)
    const pathname = usePathname();

    const highlightLabel = (label: string) => {
        if (pathname === "/" && label === "Home")
            return "bg-primary text-primary-foreground"
        if (pathname.substring(1) === label.toLowerCase())
            return "bg-primary text-primary-foreground"
    }

    return (
        <div
            id="navigation-sidebar"
            className={`fixed inset-y-0 left-0 z-[1000] hidden overflow-x-hidden border-r bg-background shadow-md transition-all duration-150 lg:block overflow-y-auto pb-16 scroll-bar-hidden pt-20 ${isHovered ? 'w-60' : 'w-16'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex flex-col w-full items-start justify-center gap-0.5 lg:px-3">
                {links.map(link => (
                    <Link
                        id={link.href}
                        href={link.href}
                        data-test-id="sidebar-home"
                        className={`${highlightLabel(link.label)} flex w-full items-center justify-start relative rounded-md whitespace-nowrap font-medium`}
                    >
                        <div className="flex size-10 shrink-0 items-center justify-center">
                            {link.icon}
                        </div>
                        <span
                            className={`size-full pr-4 text-sm transition-all duration-150 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                        >
                            {link.label}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    )
}
