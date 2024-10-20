"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Menu } from "lucide-react";
import dynamic from "next/dynamic";
import Image from 'next/image';
import NavigationFooter from "../navigation/navigation-footer";

const NavigationItems = dynamic(() => import("../navigation/navigation-items"));

const LogoTitle = () => (
    <SheetTitle className="flex mt-4 items-center space-x-2 justify-start">
        <Image
            src={`/images/msuiit-logo-275x280.png`}
            alt='IIT'
            width={40}
            height={40}
        />
        <h1 className="text-sm text-left font-bold">Thesis Management System</h1>
    </SheetTitle>
);

const MenuButton = () => (
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
);

export default function NavigationMenu() {
    const queryClient = useQueryClient();
    const { data: open } = useQuery<boolean>({ queryKey: ["navigation", "menu"] });
    const setOpen = (value: boolean) => { queryClient.setQueryData(["navigation", "menu"], value) };

    return (
        <div id="navigation-menu" className="block lg:hidden">
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

                    <div className="flex grow flex-col w-full items-center justify-end space-y-1">
                        <NavigationItems />
                        <NavigationFooter />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
