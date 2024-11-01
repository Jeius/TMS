'use client'

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { primaryLinks, toolLinks, userLinks } from '@/lib/navigation-links';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type NavigationItemsProps = {
    open?: boolean, onOpenChanged?: (value: boolean) => void,
}

export default function NavigationItems({ open, onOpenChanged: setOpen }: NavigationItemsProps) {
    const pathname = usePathname();
    const navigationLinks = [primaryLinks, userLinks, toolLinks];
    const isPathName = (href: string) => pathname === href;

    const handleClick = () => {
        setOpen && setOpen(false);
    };

    return (
        <>
            <h2 className="sr-only">Main Navigation</h2>
            <ScrollArea className="flex grow flex-col w-full items-center justify-start">
                <nav aria-label="Navigation links">
                    {navigationLinks.map((linkGroup, groupIndex) => (
                        <React.Fragment key={`link-group-${groupIndex}`}>
                            <ul className="w-full">
                                {linkGroup.map(({ label, icon: Icon, href }) => (
                                    <li key={href}>
                                        <Button
                                            asChild
                                            aria-expanded={open}
                                            aria-label={`Go to ${label}`}
                                            variant={isPathName(href) ? 'default' : 'ghost'}
                                            data-state={isPathName(href)}
                                            id={`${label.toLowerCase().replace(/ /g, '-')}`}
                                            className='p-2 space-x-3 grow-0 h-fit my-1 w-full justify-start data-[state=true]:text-secondary'
                                            onClick={handleClick}
                                        >
                                            <Link href={href} aria-current={isPathName(href) ? 'page' : undefined}>
                                                <Icon aria-hidden="true" size='1.25rem' />
                                                {open && <span className='pointer-events-none'>{label}</span>}
                                            </Link>
                                        </Button>
                                    </li>
                                ))}
                            </ul>

                            {groupIndex !== navigationLinks.length - 1 && (
                                <Separator className='my-1' orientation="horizontal" role="separator" />
                            )}
                        </React.Fragment>
                    ))}
                </nav>
            </ScrollArea>
        </>
    );
}
