"use client"

import React from "react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MenuIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

type Props = {
    links: {
        href: string
        label: string
    }[],
}

export const DropdownNav = ({ links }: Props) => {
    const pathname = usePathname()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-foreground"> <MenuIcon /> </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col w-56">
                {links.map((link) => (
                    <DropdownMenuItem key={link.href} className="hover:bg-hover">
                        <Link href={link.href}>{link.label}</Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
