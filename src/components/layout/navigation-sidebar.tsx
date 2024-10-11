"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MoonIcon, SunIcon } from "lucide-react"
import { navigationLinks } from "@/lib/navigation-links"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"

// Component for Rendering Navigation Links
const NavigationItems = ({ showLabels = true }: { showLabels?: boolean }) => {
    const pathname = usePathname()

    const getLinkHighlight = (label: string) => {
        if (pathname === "/" && label === "Home") return "bg-primary text-secondary"
        if (pathname.substring(1) === label.toLowerCase()) return "bg-primary text-secondary"
        return "hover:bg-accent"
    }

    return (
        <ScrollArea className="flex grow flex-col w-full items-center justify-start gap-1 lg:px-3">
            {navigationLinks.map((linkGroup, groupIndex) => (
                <React.Fragment key={`link-group-${groupIndex}`}>
                    {linkGroup.map(subLink => (
                        <Link
                            key={subLink.href}
                            href={subLink.href}
                            id={`sidebar-link-${subLink.label.toLowerCase().replace(/ /g, "-")}`}
                            className={`flex w-full items-center justify-start relative rounded-md whitespace-nowrap font-medium ${getLinkHighlight(subLink.label)}`}
                        >
                            <div aria-hidden="true" className="flex size-9 p-2 shrink-0 items-center justify-center">
                                {subLink.icon}
                            </div>
                            {showLabels && (
                                <span className="pr-4 text-sm pointer-events-none">
                                    {subLink.label}
                                </span>
                            )}
                        </Link>
                    ))}

                    {groupIndex !== navigationLinks.length - 1 && (
                        <Separator className='my-1' orientation="horizontal" />
                    )}
                </React.Fragment>
            ))}
        </ScrollArea>
    )
}

// Theme Switch Component
const ThemeSwitch = ({ showLabel }: { showLabel: boolean }) => {
    const [darkMode, setDarkMode] = React.useState(false)

    // Load theme from local storage on initial render
    React.useEffect(() => {
        const savedTheme = localStorage.getItem("theme")
        setDarkMode(savedTheme === "dark")
    }, [])

    // Update theme in local storage and document root
    React.useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode)
        localStorage.setItem("theme", darkMode ? "dark" : "light")
    }, [darkMode])

    const toggleTheme = () => {
        setDarkMode(prev => !prev)
    }

    return (
        <Button
            className='flex p-0 w-full items-center justify-start relative rounded-md whitespace-nowrap font-medium'
            variant='ghost'
            aria-label="Toggle theme"
            id="Toggle theme"
            onClick={toggleTheme}
        >
            <div aria-hidden="true" className="flex size-9 p-2 shrink-0 items-center justify-center">
                {darkMode ? <MoonIcon /> : <SunIcon />}
            </div>
            {showLabel && (
                <span className="pr-4 text-sm">
                    {darkMode ? "Dark Mode" : "Light Mode"}
                </span>
            )}
        </Button>
    )
}

// Main Navigation Sidebar Component
export default function NavigationSideBar() {
    const [canExpand, setCanExpand] = React.useState(false)

    const handleExpand = (expand: boolean) => {
        setCanExpand(expand)
    }

    return (
        <div
            id="navigation-sidebar"
            className={`fixed z-10 inset-y-0 left-0 hidden lg:flex flex-col justify-start items-center overflow-x-hidden border-r bg-background shadow-md transition-all duration-150 overflow-y-auto pb-10 pt-20 scroll-bar-hidden ${canExpand ? 'w-60' : 'w-16'}`}
            onMouseEnter={() => handleExpand(true)}
            onMouseLeave={() => handleExpand(false)}
            onFocus={() => handleExpand(true)}
            onBlur={() => handleExpand(false)}
        >
            {/* Sidebar Links */}
            <NavigationItems showLabels={canExpand} />

            {/* Theme Switch and Separator */}
            <div id="sidebar-footer" className="flex flex-col w-full items-start justify-center lg:px-3">
                <Separator className='my-1' orientation="horizontal" />
                <ThemeSwitch showLabel={canExpand} />
            </div>
        </div>
    )
}