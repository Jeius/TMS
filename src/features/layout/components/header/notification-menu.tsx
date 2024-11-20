import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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
            size="icon"
            className="shrink-0 rounded-full"
            variant="ghost"
            aria-label="Open Notifications"
          >
            <Bell aria-hidden="true" />
          </Button>
        </PopoverTrigger>
      </TooltipWrapper>
      <PopoverContent
        id="user-menu"
        align="end"
        className="p-2"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <ScrollArea className="flex max-h-52 w-full flex-col space-y-1">
          {notifications.map((item, index) => (
            <Button
              key={index}
              size="sm"
              variant="ghost"
              className="w-full justify-start"
              asChild
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
