"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { TooltipWrapper } from "@/components/ui/tooltip";
import { Link } from "lucide-react";

export default function UserMenu() {
    return (
        <DropdownMenu>
            <TooltipWrapper label="Account" className="mr-3">
                <DropdownMenuTrigger asChild>
                    <Button
                        id="user-avatar"
                        aria-label="Account"
                        className="size-fit p-0 rounded-full border-2 border-primary"
                        variant="outline"
                    >
                        <Avatar className="size-9">
                            <AvatarImage
                                src="https://github.com/jeius.png"
                                alt="User Avatar"
                                className="transition-all duration-150 filter-none hover:brightness-150" />
                            <AvatarFallback>
                                <Skeleton />
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
            </TooltipWrapper>

            <DropdownMenuContent onCloseAutoFocus={e => e.preventDefault()} id="user-menu-dropdown" className="z-[120] mr-1">
                {["Profile", "User Management", "Settings", "Logout"].map((item, index) => (
                    <DropdownMenuItem key={index}>
                        <Link href={`/${item.toLowerCase().replace(' ', '-')}`}>{item}</Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}