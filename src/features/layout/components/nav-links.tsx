'use client'

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { USERROUTES } from '@/lib/constants';
import { primaryLinks, toolLinks, userLinks } from '@/lib/navigation-links';
import { supabaseBrowserClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

type NavigationItemsProps = {
    open?: boolean, onOpenChanged?: (value: boolean) => void,
}

export default function NavLinks({ open, onOpenChanged: setOpen }: NavigationItemsProps) {
    const pathname = usePathname();
    const [user, setUser] = useState<User | null>(null);
    const supabase = supabaseBrowserClient();

    const navLinks = useMemo(() => {
        if (user) return [primaryLinks, userLinks, toolLinks];

        return [
            primaryLinks.filter(link => !Object.values(USERROUTES).includes(link.href)),
            toolLinks
        ];
    }, [user, primaryLinks, userLinks, toolLinks, USERROUTES]);

    function isPathName(href: string) {
        return pathname === href;
    }

    function handleClick() {
        if (setOpen) setOpen(false);
    }

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase.auth.getSession();
            setUser(data.session?.user ?? null);
        };

        fetchUser();

        const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    return (
        <>
            <h2 className="sr-only">Main Navigation</h2>
            <ScrollArea className="flex grow flex-col w-full items-center justify-start">
                <nav aria-label="Navigation links">
                    {navLinks.map((linkGroup, groupIndex) => (
                        <React.Fragment key={`link-group-${groupIndex}`}>
                            <ul className="w-full">
                                {linkGroup.map(({ label, icon: Icon, href }) => (
                                    <li key={href}>
                                        <Button
                                            asChild
                                            aria-expanded={open}
                                            aria-label={`Go to ${label}`}
                                            variant={isPathName(href) ? 'default' : 'ghost'}
                                            data-page={isPathName(href)}
                                            id={`${label.toLowerCase().replace(/ /g, '-')}`}
                                            className='p-2 space-x-3 grow-0 h-fit my-1 w-full justify-start data-[page=true]:text-secondary'
                                            onClick={handleClick}
                                        >
                                            <Link href={href} aria-current={isPathName(href) ? 'page' : undefined}>
                                                <Icon aria-hidden="true" size='1.25rem' className='shrink-0' />
                                                {open && (
                                                    <motion.span
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.15 }}
                                                        className='pointer-events-none'
                                                    >
                                                        {label}
                                                    </motion.span>
                                                )}
                                            </Link>
                                        </Button>
                                    </li>
                                ))}
                            </ul>

                            {groupIndex !== navLinks.length - 1 && (
                                <Separator className='my-1' orientation="horizontal" role="separator" />
                            )}
                        </React.Fragment>
                    ))}
                </nav>
            </ScrollArea>
        </>
    );
}
