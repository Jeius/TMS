"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { TooltipWrapper } from "@/components/ui/tooltip";
import { accountLinks } from "@/utils/data/test/navigation-links";
import Link from "next/link";



export default function UserMenu() {
    return (
        <Popover>
            <TooltipWrapper label="Account" className="mr-3">
                <PopoverTrigger asChild>
                    <Button
                        id="user-avatar"
                        aria-label="Account"
                        className="size-fit p-0 rounded-full border-2 border-primary"
                        variant="outline"
                    >
                        <Avatar aria-hidden="true" className="size-9">
                            <AvatarImage
                                src="https://github.com/jeius.png"
                                alt="User Avatar"
                                className="transition-all duration-150 filter-none hover:brightness-150" />
                            <AvatarFallback>
                                <Skeleton className="size-full" />
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </PopoverTrigger>
            </TooltipWrapper>
            <PopoverContent id="user-menu" sideOffset={12} className="mr-1 p-2 max-w-40"
                onCloseAutoFocus={e => e.preventDefault()}
            >
                <div className="flex flex-col space-y-1">
                    {accountLinks.map((item, index) => (
                        <Button key={index} size="sm" variant="ghost" className="justify-start" asChild>
                            <Link href={item.href} className="flex space-x-3 items-center justify-between">
                                <span>{item.label}</span> {item.icon}
                            </Link>
                        </Button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}