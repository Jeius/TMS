'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import NavigationItems from '@/features/layout/components/navigation-items';
import { NAVIGATIONROUTES } from '@/lib/constants';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';


function LogoTitle() {
    return (
        <SheetTitle className="flex mt-4 items-center space-x-2 justify-start">
            <Image
                src={'/images/msuiit-logo-275x280.png'}
                alt='IIT'
                width={40}
                height={40} />
            <span className="text-sm text-left font-bold">Thesis Management System</span>
        </SheetTitle>
    );
}

function MenuButton() {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <SheetTrigger asChild>
                    <Button className="size-fit p-2" variant="ghost" aria-label="Open Menu">
                        <Menu aria-hidden="true" focusable="false" />
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
    const pathname = usePathname()
    const isNavigationRoute = Object.values(NAVIGATIONROUTES).includes(pathname);

    return (
        (isNavigationRoute && pathname !== '/') && (
            <div id="navigation-menu" className="block lg:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                    <MenuButton />
                    <SheetContent
                        onCloseAutoFocus={(e) => e.preventDefault()}
                        className="flex flex-col w-64 sm:w-72 z-[110]"
                        side="left"
                        aria-describedby={undefined}
                    >
                        <SheetHeader>
                            <LogoTitle />
                        </SheetHeader>

                        <div className="grow w-full overflow-y-auto">
                            <NavigationItems open={open} onOpenChanged={setOpen} />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        )
    );
}
