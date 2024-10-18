"use client"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '../../ui/sheet';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Separator } from '../../ui/separator';
import { navigationLinks } from '@/lib/navigation-links';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '../../ui/button';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


export default function AppMenu() {
    const pathname = usePathname();

    const highlightLabel = (label: string) => {
        if (pathname === "/" && label === "Home") return "font-bold bg-primary text-secondary"
        if (pathname.substring(1) === label.toLowerCase()) return "font-bold bg-primary text-secondary"
        return "hover:bg-accent font-medium"
    }
    return (
        <TooltipProvider>
            <Sheet>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <SheetTrigger asChild>
                            <Button className="size-fit p-2" variant="ghost">
                                <Menu aria-hidden />
                                <span className="sr-only">Open Menu</span>
                            </Button>
                        </SheetTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Menu</p>
                    </TooltipContent>
                </Tooltip>
                <SheetContent onCloseAutoFocus={e => e.preventDefault()} className="w-64 sm:w-72 z-[110]" side="left">
                    <SheetHeader>
                        <SheetTitle className="flex mt-4 items-center space-x-2 justify-start">
                            <Image
                                src={`/images/msuiit-logo-275x280.png`}
                                alt='IIT'
                                width={40}
                                height={40}
                            />
                            <h1 className="text-sm text-left font-bold">Thesis Management System</h1>
                        </SheetTitle>
                    </SheetHeader>

                    <div className="flex mt-6 grow flex-col w-full items-center justify-start gap-1 lg:px-3">
                        {navigationLinks.map((link, index) => (
                            <React.Fragment key={index}>
                                {link.map(subLink => (
                                    <SheetClose key={subLink.href} asChild>
                                        <Link
                                            key={subLink.href}
                                            href={subLink.href}
                                            data-test-id={`sidebar-${subLink.label.toLowerCase()}`}
                                            className={`flex w-full items-center justify-start relative rounded-md whitespace-nowrap ${highlightLabel(subLink.label)}`}
                                        >
                                            <div className="flex size-9 p-2 shrink-0 items-center justify-center">
                                                {subLink.icon}
                                            </div>
                                            <span
                                                className={`pr-4 text-sm transition-all duration-150`}
                                            >
                                                {subLink.label}
                                            </span>
                                        </Link>
                                    </SheetClose>
                                ))}

                                {index !== navigationLinks.length - 1 && <Separator orientation="horizontal" />}
                            </React.Fragment>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </TooltipProvider>
    )
}