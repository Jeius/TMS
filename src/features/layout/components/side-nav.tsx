'use client';

import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/auth-provider';
import NavLinks from '@/features/layout/components/nav-links';
import { NAVROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ThemeSwitch from './theme-switch';

export default function SideNav() {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState<string>();
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  const isNavigationRoute = Object.values(NAVROUTES).includes(pathname);

  useEffect(() => {
    const newWidth = open ? '15rem' : '4.2rem';
    setWidth(newWidth);
  }, [open]);

  return (
    isNavigationRoute &&
    isSignedIn && (
      <motion.div
        id="side-navigation"
        role="navigation"
        aria-label="Side Navigation"
        className={cn(
          'fixed inset-y-0 left-0 z-10 hidden border-r bg-card/60 lg:block',
          'overflow-x-hidden px-3 pb-10 pt-20 shadow-md backdrop-blur-lg'
        )}
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1, width: width }}
        transition={{
          type: 'spring',
          duration: 0.2,
          x: { type: 'spring', duration: 0.4 },
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        <div className="flex size-full flex-col justify-between space-y-1">
          <NavLinks isSignedIn={isSignedIn} open={open} />
          <div className="flex flex-col" role="contentinfo">
            <Separator
              className="my-1"
              orientation="horizontal"
              role="separator"
            />
            <ThemeSwitch open={open} />
          </div>
        </div>
      </motion.div>
    )
  );
}
