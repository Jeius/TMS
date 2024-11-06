'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import NavLinks from '@/features/layout/components/nav-links';
import { NAVROUTES } from '@/lib/constants';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ThemeSwitch from '../theme-switch';


function LogoTitle() {
    return (
        <SheetTitle className="flex mt-4 items-center space-x-2 justify-start">
            <Image
                src={'/images/msuiit-logo-275x280.png'}
                alt="MSU-IIT Seal of Excellence"
                width={275}
                height={280}
                role='img'
                className='size-[3.5rem]'
            />
            <span className="text-left">Thesis Management System</span>
        </SheetTitle>
    );
}

function MenuButton() {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <SheetTrigger asChild>
                    <Button className='size-fit p-2' variant="ghost" aria-label="Open Menu">
                        <Menu aria-hidden="true" focusable="false" size='1.5rem' />
                    </Button>
                </SheetTrigger>
            </TooltipTrigger>
            <TooltipContent>
                <p>Menu</p>
            </TooltipContent>
        </Tooltip>
    );
}

export default function NavigationMenu() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const isMounted = useIsMounted();
    const isNavigationRoute = Object.values(NAVROUTES).includes(pathname);

    return (
        (isNavigationRoute && pathname !== '/') && (
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
                            <NavLinks open={open} onOpenChanged={setOpen} />
                            {isMounted && (
                                <div className="flex flex-col" role="contentinfo">
                                    <Separator className='my-1' orientation="horizontal" role="separator" />
                                    <ThemeSwitch open={open} />
                                </div>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        )
    );
}
