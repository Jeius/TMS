'use client';

import LogoutButton from '@/components/logout-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import { TooltipWrapper } from '@/components/ui/tooltip';
import { accountLinks } from '@/lib/navigation-links';
import Link from 'next/link';

export default function UserMenu() {
  return (
    <Popover>
      <TooltipWrapper label="Account" className="mr-3">
        <PopoverTrigger asChild>
          <Button
            id="user-avatar"
            aria-label="Account"
            className="size-fit rounded-full border-2 border-primary p-0"
            variant="outline"
          >
            <Avatar aria-hidden="true" className="size-9">
              <AvatarImage
                src="https://github.com/jeius.png"
                alt="User Avatar"
                className="filter-none transition-all duration-150 hover:brightness-150"
              />
              <AvatarFallback>
                <Skeleton className="size-full" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </PopoverTrigger>
      </TooltipWrapper>
      <PopoverContent
        id="user-menu"
        align="end"
        className="max-w-40 p-2"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex flex-col space-y-1">
          {accountLinks.map(({ href, label, icon: Icon }) => (
            <Button
              asChild
              key={label}
              size="sm"
              variant="ghost"
              aria-label={label}
              className="flex items-center justify-between space-x-3"
            >
              <Link href={href}>
                <span>{label}</span>
                <Icon size={16} />
              </Link>
            </Button>
          ))}
          <LogoutButton
            variant="ghost"
            className="flex items-center justify-between space-x-3"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
