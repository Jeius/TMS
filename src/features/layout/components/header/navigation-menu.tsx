'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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
          href="/"
          aria-label="Go to homepage"
          className="mt-4 flex items-center justify-start text-left text-base"
        >
          <Image
            src={'/images/msuiit-logo-275x280.png'}
            alt="MSU-IIT Seal of Excellence"
            width={275}
            height={280}
            priority
            role="img"
            className="mr-2 size-14"
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
            size="icon"
            variant="ghost"
            aria-label="Open Menu"
            className="p-0 hover:bg-transparent"
          >
            <Menu aria-hidden="true" />
          </Button>
        </SheetTrigger>
      </TooltipTrigger>
      <TooltipContent align="start">
        <p>Menu</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default function NavigationMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { isSignedIn } = useAuthListener();
  const isNavigationRoute = Object.values(NAVROUTES).includes(pathname);

  return (
    isNavigationRoute &&
    isSignedIn && (
      <div
        id="navigation-menu"
        role="navigation"
        aria-label="Navigation Menu"
        className="block lg:hidden"
      >
        <Sheet open={open} onOpenChange={setOpen}>
          <MenuButton />
          <SheetContent
            onCloseAutoFocus={(e) => e.preventDefault()}
            className="z-[110] flex w-64 flex-col sm:w-72"
            side="left"
          >
            <SheetHeader>
              <LogoTitle />
            </SheetHeader>

            <SheetDescription className="sr-only">
              This menu contains links to the primary sections of the Thesis
              Management System.
            </SheetDescription>

            <div className="flex w-full grow flex-col justify-between overflow-y-auto">
              <NavLinks
                isSignedIn={isSignedIn}
                open={open}
                onOpenChanged={setOpen}
              />
              <div className="flex flex-col" role="contentinfo">
                <Separator
                  className="my-1"
                  orientation="horizontal"
                  role="separator"
                />
                <ThemeSwitch open={open} />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    )
  );
}
