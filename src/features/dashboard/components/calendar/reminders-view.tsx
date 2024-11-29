'use client';

import BasicTooltip from '@/components/basic-tooltip';
import { Button } from '@/components/ui/button';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import useGlobalState from '@/lib/hooks/use-global-state';
import { cn } from '@/lib/utils';
import { HTMLMotionProps, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { CalendarViews } from './calendar-card';
import RemindersItems from './reminders-items';

type ReminderViewProps = HTMLMotionProps<'div'> & {
  open?: boolean;
  view?: CalendarViews;
  setView?: (value: CalendarViews) => void;
};

export default function RemindersView({
  open: isOpen,
  view,
  setView,
  className,
  ...props
}: ReminderViewProps) {
  const date = useGlobalState('date', new Date())[0];
  const toggleView = () => setView && setView('calendar');

  return (
    (isOpen || view === 'reminders') && (
      <motion.div
        id="reminders"
        className={cn('flex grow flex-col p-5', className)}
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        {...props}
      >
        <CardHeader className="flex flex-row items-center space-y-0 p-0">
          {!isOpen && (
            <BasicTooltip label="Go to calendar">
              <Button
                id="go-to-calendar"
                aria-label="Go to calendar"
                variant="ghost"
                onClick={toggleView}
                className="mr-2 size-fit rounded-md p-2"
              >
                <ArrowLeft />
              </Button>
            </BasicTooltip>
          )}
          <CardTitle>Reminders</CardTitle>
        </CardHeader>
        <CardDescription className="text-right text-xs font-semibold text-foreground">
          {date?.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </CardDescription>
        <Separator orientation="horizontal" />
        <CardContent className="relative h-full p-0">
          <RemindersItems />
        </CardContent>
      </motion.div>
    )
  );
}
