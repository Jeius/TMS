'use client';

import BasicTooltip from '@/components/basic-tooltip';
import LogoutButton from '@/components/logout-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import { accountLinks } from '@/lib/navigation-links';
import Link from 'next/link';

export default function UserMenu() {
  return (
    <Popover>
      <BasicTooltip label="Account">
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
      </BasicTooltip>
      <PopoverContent
        id="user-menu"
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
              className="justify-between text-xs font-semibold"
            >
              <Link href={href}>
                {label}
                <Icon aria-hidden="true" />
              </Link>
            </Button>
          ))}
          <LogoutButton
            variant="ghost"
            className="justify-between text-xs font-semibold"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
