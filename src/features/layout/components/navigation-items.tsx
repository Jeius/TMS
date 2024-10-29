'use client'

import ThemeToggle from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { primaryLinks, toolLinks, userLinks } from '@/lib/navigation-links';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type NavigationItemsProps = React.HTMLAttributes<HTMLDivElement> & {
    open?: boolean, onOpenChanged?: (value: boolean) => void,
}

export default function NavigationItems({ className, open, onOpenChanged: setOpen, ...props }: NavigationItemsProps) {
    const pathname = usePathname();
    const navigationLinks = [primaryLinks, userLinks, toolLinks];
    const isMounted = useIsMounted();

    const isPathName = (href: string) => pathname === href;

    const handleClick = () => {
        setOpen && setOpen(false);
    };

    return (
        <div className={cn('flex flex-col space-y-1 w-full h-full justify-between', className)} {...props}>
            <ScrollArea className="flex grow flex-col w-full items-center justify-start">
                {navigationLinks.map((linkGroup, groupIndex) => (
                    <React.Fragment key={`link-group-${groupIndex}`}>
                        {linkGroup.map(({ label, icon: Icon, href }) => (
                            <Button
                                asChild
                                key={href}
                                aria-label={`Go to ${label}`}
                                variant={isPathName(href) ? 'default' : 'ghost'}
                                data-state={isPathName(href)}
                                id={`sidebar-${label.toLowerCase().replace(/ /g, '-')}`}
                                className='p-2 space-x-3 h-fit my-1 w-full justify-start data-[state=true]:text-secondary'
                                onClick={handleClick}
                            >
                                <Link href={href}>
                                    <Icon aria-hidden="true" size={20} />
                                    {open && <span className='pointer-events-none'>{label}</span>}
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
