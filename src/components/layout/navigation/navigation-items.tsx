"use client"

import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useIsMounted } from "@/lib/hooks/use-is-mounted";
import { cn } from "@/lib/utils";
import { primaryLinks, toolLinks, userLinks } from "@/utils/data/test/navigation-links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavigationItemsProps = React.HTMLAttributes<HTMLDivElement> & {
    open?: boolean, onOpenChanged?: (value: boolean) => void,
}

export default function NavigationItems({ className, open, onOpenChanged: setOpen, ...props }: NavigationItemsProps) {
    const pathname = usePathname();
    const navigationLinks = [primaryLinks, userLinks, toolLinks];
    const isMounted = useIsMounted();

    const highlight = (label: string) => {
        const currentPath = pathname === "/" ? "home" : pathname.substring(1);
        return currentPath === label.toLowerCase() ? "bg-primary text-secondary" : "hover:bg-accent font-medium";
    };

    const handleClick = () => {
        setOpen && setOpen(false);
    };


    return (
        <div className={cn("flex flex-col space-y-1 w-full h-full justify-between", className)} {...props}>
            <ScrollArea className="flex grow flex-col w-full items-center justify-start">
                {navigationLinks.map((linkGroup, groupIndex) => (
                    <React.Fragment key={`link-group-${groupIndex}`}>
                        {linkGroup.map(subLink => (
                            <Button key={subLink.href} variant="ghost" asChild
                                className={`p-0 h-fit my-1 w-full justify-start rounded-md whitespace-nowrap ${highlight(subLink.label)}`}
                            >
                                <Link href={subLink.href} onClick={handleClick}
                                    id={`sidebar-link-${subLink.label.toLowerCase().replace(/ /g, "-")}`}
                                    title={`sidebar-link-${subLink.label.toLowerCase().replace(/ /g, "-")}`}
                                >
                                    <div aria-hidden="true" className="flex size-9 p-2 shrink-0 items-center justify-center">
                                        {subLink.icon}
                                    </div>
                                    {open && (
                                        <span className="pr-4 text-sm pointer-events-none">
                                            {subLink.label}
                                        </span>
                                    )}
                                </Link>
                            </Button>
                        ))}

                        {groupIndex !== navigationLinks.length - 1 && (
                            <Separator className='my-1' orientation="horizontal" />
                        )}
                    </React.Fragment>
                ))}
            </ScrollArea>

            {isMounted && (
                <div className="flex flex-col w-full">
                    <Separator className='my-1' orientation="horizontal" />
                    <ThemeToggle open={open} />
                </div>
            )}
        </div>
    );
}
