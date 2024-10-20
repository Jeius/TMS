"use client"

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TooltipWrapper } from "@/components/ui/tooltip";
import { Bell } from "lucide-react";
import Link from "next/link";

const notifications = [
    { href: "#", label: 'Notification 1' },
    { href: "#", label: 'Notification 2' },
    { href: "#", label: 'Notification 3' },
    { href: "#", label: 'Notification 4' },
    { href: "#", label: 'Notification 5' },
];

export default function NotificationMenu() {
    return (
        <Popover>
            <TooltipWrapper label="Notifications">
                <PopoverTrigger asChild>
                    <Button
                        id="notification-button"
                        className="rounded-full size-fit p-2 text-foreground"
                        variant="ghost"
                        aria-label="Open Notifications"
                    >
                        <Bell aria-hidden="true" focusable="false" className="size-5" />
                    </Button>
                </PopoverTrigger>
            </TooltipWrapper>
            <PopoverContent id="user-menu" sideOffset={15} className="p-2 max-w-40"
                onCloseAutoFocus={e => e.preventDefault()}
            >
                <div className="flex flex-col space-y-1">
                    {notifications.map((item, index) => (
                        <Button key={index} size="sm" variant="ghost" className="justify-start" asChild>
                            <Link href={item.href} className="flex space-x-3 items-center justify-between">
                                <span>{item.label}</span>
                            </Link>
                        </Button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}