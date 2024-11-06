import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TooltipWrapper } from '@/components/ui/tooltip';
import { Bell } from 'lucide-react';
import Link from 'next/link';

const notifications = [
    { href: '#', label: 'Notification 1' },
    { href: '#', label: 'Notification 2' },
    { href: '#', label: 'Notification 3' },
    { href: '#', label: 'Notification 4' },
    { href: '#', label: 'Notification 5' },
    { href: '#', label: 'Notification 1' },
    { href: '#', label: 'Notification 2' },
    { href: '#', label: 'Notification 3' },
    { href: '#', label: 'Notification 4' },
    { href: '#', label: 'Notification 5' },
    { href: '#', label: 'Notification 1' },
    { href: '#', label: 'Notification 2' },
    { href: '#', label: 'Notification 3' },
    { href: '#', label: 'Notification 4' },
    { href: '#', label: 'Notification 5' },
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
            <PopoverContent id="user-menu" sideOffset={15} className="p-2 pb-4 h-min mr-4"
                onCloseAutoFocus={e => e.preventDefault()}
            >
                <ScrollArea className="flex flex-col max-h-52 w-full space-y-1">
                    {notifications.map((item, index) => (
                        <Button key={index} size="sm" variant="ghost" className="w-full justify-start" asChild>
                            <Link href={item.href}>{item.label}</Link>
                        </Button>
                    ))}
                </ScrollArea>
            </PopoverContent>
        </Popover>
    )
}