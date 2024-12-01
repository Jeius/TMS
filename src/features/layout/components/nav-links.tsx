'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { USERROUTES } from '@/lib/constants';
import { primaryLinks, toolLinks, userLinks } from '@/lib/navigation-links';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';

type NavigationItemsProps = {
  open?: boolean;
  onOpenChanged?: (value: boolean) => void;
  isSignedIn?: boolean;
};

export default function NavLinks({
  open,
  onOpenChanged: setOpen,
  isSignedIn,
}: NavigationItemsProps) {
  const pathname = usePathname();

  const navLinks = useMemo(() => {
    if (isSignedIn) return [primaryLinks, userLinks, toolLinks];

    return [
      primaryLinks.filter(
        (link) => !Object.values(USERROUTES).includes(link.href)
      ),
      toolLinks,
    ];
  }, [isSignedIn]);

  function isPathName(href: string) {
    return pathname === href;
  }

  function handleClick() {
    if (setOpen) setOpen(false);
  }

  return (
    <>
      <h2 className="sr-only">Main Navigation</h2>
      <ScrollArea className="w-full" role="navigation">
        <ul aria-label="Navigation links" className="w-full space-y-1 p-1">
          {navLinks.map((linkGroup, groupIndex) => (
            <React.Fragment key={`link-group-${groupIndex}`}>
              {linkGroup.map(({ label, icon: Icon, href }) => (
                <li key={href}>
                  <Button
                    asChild
                    size="sm"
                    aria-expanded={open}
                    aria-label={`Go to ${label}`}
                    variant={isPathName(href) ? 'default' : 'ghost'}
                    data-page={isPathName(href)}
                    id={`${label.toLowerCase().replace(/ /g, '-')}`}
                    className="w-full justify-start data-[page=true]:text-secondary"
                    onClick={handleClick}
                  >
                    <Link
                      href={href}
                      aria-current={isPathName(href) ? 'page' : undefined}
                    >
                      <Icon aria-hidden="true" />
                      {open && label}
                    </Link>
                  </Button>
                </li>
              ))}

              {groupIndex !== navLinks.length - 1 && (
                <Separator
                  className="my-1"
                  orientation="horizontal"
                  role="separator"
                />
              )}
            </React.Fragment>
          ))}
        </ul>
      </ScrollArea>
    </>
  );
}
