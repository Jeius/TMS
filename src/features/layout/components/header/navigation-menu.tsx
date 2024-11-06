'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import NavLinks from '@/features/layout/components/nav-links';
import { NAVROUTES } from '@/lib/constants';
import useAuthListener from '@/lib/hooks/use-auth-listener';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ThemeSwitch from '../theme-switch';


function LogoTitle() {
    return (
        <SheetTitle>
            <SheetClose asChild>
                <Link
                    href='/'
                    aria-label='Go to homepage'
                    className="flex mt-4 items-center text-base justify-start text-left"
                >
                    <Image
                        src={'/images/msuiit-logo-275x280.png'}
                        alt="MSU-IIT Seal of Excellence"
                        width={275}
                        height={280}
                        priority
                        role='img'
                        className='size-14 mr-2'
                    />
                    Thesis Management System
                </Link>
            </SheetClose>
        </SheetTitle>
    );
}

function MenuButton() {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <SheetTrigger asChild>
                    <Button
                        size='icon'
                        variant="ghost"
                        aria-label="Open Menu"
                        className='hover:bg-transparent p-0'
                    >
                        <Menu aria-hidden="true" />
                    </Button>
                </SheetTrigger>
            </TooltipTrigger>
            <TooltipContent align='start'>
                <p>Menu</p>
            </TooltipContent>
        </Tooltip>
    );
}

export default function NavigationMenu() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const { isMounted, isSignedIn } = useAuthListener();
    const isNavigationRoute = Object.values(NAVROUTES).includes(pathname);

    return (
        (isNavigationRoute && pathname !== '/' && isMounted) && (
            <div id="navigation-menu" role='navigation' aria-label='Navigation Menu' className="block lg:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                    <MenuButton />
                    <SheetContent
                        onCloseAutoFocus={(e) => e.preventDefault()}
                        className="flex flex-col w-64 sm:w-72 z-[110]"
                        side="left"
                    >
                        <SheetHeader>
                            <LogoTitle />
                        </SheetHeader>

                        <SheetDescription className="sr-only">
                            This menu contains links to the primary sections of the Thesis Management System.
                        </SheetDescription>

                        <div className="grow flex flex-col justify-between w-full overflow-y-auto">
                            <NavLinks isSignedIn={isSignedIn} open={open} onOpenChanged={setOpen} />
                            <div className="flex flex-col" role="contentinfo">
                                <Separator className='my-1' orientation="horizontal" role="separator" />
                                <ThemeSwitch open={open} />
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        )
    );
}
