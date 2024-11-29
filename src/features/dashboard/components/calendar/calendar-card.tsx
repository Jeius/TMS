'use client';

import { Card } from '@/components/ui/card';
import useBaseFontSize from '@/lib/hooks/use-base-font-size';
import useWindowSize from '@/lib/hooks/use-window-size';
import { cn, Screens } from '@/lib/utils';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import CalendarView from './calendar-view';
import RemindersView from './reminders-view';

export type CalendarViews = 'calendar' | 'reminders';

export default function CalendarCard({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Card>) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<CalendarViews>('calendar');
  const { width: windowWidth } = useWindowSize();
  const baseFontSize = useBaseFontSize();

  useEffect(() => {
    function toRem(value: number) {
      return value / baseFontSize;
    }
    function toNumber(value: string) {
      const [result] = value.split('rem');
      return parseFloat(result);
    }

    if (toRem(windowWidth) >= toNumber(Screens['2xl'])) {
      if (!open) setOpen(true);
      return;
    }
    if (
      toRem(windowWidth) <= toNumber(Screens['lg']) &&
      toRem(windowWidth) >= toNumber(Screens['md'])
    ) {
      if (!open) setOpen(true);
      return;
    }
    if (open) setOpen(false);
  }, [windowWidth, open, baseFontSize]);

  return (
    <Card
      id="calendar/reminders-card"
      className={cn('flex h-[28.125rem] w-full overflow-hidden', className)}
      {...props}
    >
      <AnimatePresence initial={false}>
        <CalendarView
          layout
          key="calendar"
          open={open}
          view={view}
          setView={setView}
        />
        <RemindersView
          layout
          key="reminders"
          open={open}
          view={view}
          setView={setView}
        />
      </AnimatePresence>
    </Card>
  );
}
