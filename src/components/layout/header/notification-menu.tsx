"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TooltipWrapper } from "@/components/ui/tooltip";
import { Bell, Link } from "lucide-react";

export default function NotificationMenu() {
    const notifications = [
        'Notification 1',
        'Notification 2',
        'Notification 3',
        'Notification 4',
        'Notification 5',
    ];

    return (
        <DropdownMenu>
            <TooltipWrapper label="Notifications">
                <DropdownMenuTrigger asChild>
                    <Button
                        id="notification-button"
                        className="rounded-full size-fit p-2 text-foreground"
                        variant="ghost"
                        aria-label="Open Notifications"
                    >
                        <Bell className="size-5" />
                    </Button>
                </DropdownMenuTrigger>
            </TooltipWrapper>

            <DropdownMenuContent onCloseAutoFocus={e => e.preventDefault()} id="notification-dropdown" className="z-[2000] mr-1">
                {notifications.map((notification, index) => (
                    <DropdownMenuItem key={index}>
                        <Link href="#">{notification}</Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}