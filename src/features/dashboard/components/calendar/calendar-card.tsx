'use client'

import { Card } from '@/components/ui/card';
import useWindowSize from '@/lib/hooks/use-window-size';
import { cn, Screens } from '@/lib/utils';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import CalendarView from './calendar-view';
import RemindersView from './reminders-view';


export default function CalendarCard({ className, ...props }: React.ComponentPropsWithRef<typeof Card>) {
    const [open, setOpen] = React.useState(false);
    const { width: windowWidth } = useWindowSize();
    const width = open ? 600 : 300;

    useEffect(() => {
        if (windowWidth >= Screens['2xl']) {
            !open && setOpen(true);
            return;
        }
        if (windowWidth <= Screens['lg'] && windowWidth >= Screens['md']) {
            !open && setOpen(true);
            return;
        }
        open && setOpen(false);
    }, [windowWidth, open]);

    return (
        <motion.div
            animate={{ width: width }}
            transition={{ type: 'tween', duration: 0.2, }}
        >
            <Card id="calendar/reminders-card" variant="glass"
                className={cn('flex overflow-hidden w-full h-[450px]', className)}
                {...props}
            >
                <CalendarView open={open} />
                <RemindersView open={open} />
            </Card>
        </motion.div>
    );
}