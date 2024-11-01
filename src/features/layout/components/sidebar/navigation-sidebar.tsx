'use client';

import { Separator } from '@/components/ui/separator';
import NavigationItems from '@/features/layout/components/navigation-items';
import { NAVIGATIONROUTES } from '@/lib/constants';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ThemeSwitch from '../theme-switch';

export default function NavigationSideBar() {
    const [open, setOpen] = useState(false);
    const [width, setWidth] = useState<string>();
    const pathname = usePathname();
    const isMounted = useIsMounted();
    const isNavigationRoute = Object.values(NAVIGATIONROUTES).includes(pathname);

    useEffect(() => {
        const newWidth = open ? '15rem' : '4rem';
        setWidth(newWidth);
    }, [open]);

    return (
        (isNavigationRoute && pathname !== '/') && (
            <motion.div
                id="navigation-sidebar"
                role='navigation'
                aria-expanded={open}
                aria-label='Navigation sidebar'
                className={cn(
                    'fixed z-10 inset-y-0 left-0 hidden lg:block border-r bg-card/60',
                    'backdrop-blur-lg shadow-md pb-10 pt-20 px-3 w-fit'
                )}
                initial={{ x: -60, opacity: 0, }}
                animate={{ width: width, x: 0, opacity: 1 }}
                transition={{
                    type: 'spring', duration: 0.2,
                    x: { type: 'spring', duration: 0.4 },
                }}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
            >
                <div className='flex flex-col space-y-1 w-full h-full justify-between'>
                    <NavigationItems open={open} />
                    {isMounted && (
                        <div className="flex flex-col" role="contentinfo">
                            <Separator className='my-1' orientation="horizontal" role="separator" />
                            <ThemeSwitch open={open} />
                        </div>
                    )}
                </div>

            </motion.div>
        )
    );
}