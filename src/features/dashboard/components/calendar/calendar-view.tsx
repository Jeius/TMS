'use client';

import BasicTooltip from '@/components/basic-tooltip';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import useGlobalState from '@/lib/hooks/use-global-state';
import { cn } from '@/lib/utils';
import { HTMLMotionProps, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { CalendarViews } from './calendar-card';

type CalendarViewProps = HTMLMotionProps<'div'> & {
  open?: boolean;
  view?: CalendarViews;
  setView?: (value: CalendarViews) => void;
};

export default function CalendarView({
  open: isOpen,
  view,
  setView,
  className,
  ...props
}: CalendarViewProps) {
  const today = useMemo(() => new Date(), []);
  const [month, setMonth] = useState(today);
  const [date, setDate] = useGlobalState('date', today);

  function toggleView() {
    return setView && setView('reminders');
  }

  function onCalendarSelect(date?: Date) {
    if (date) setDate(date);
    toggleView();
  }

  return (
    (isOpen || view === 'calendar') && (
      <motion.div
        id="calendar"
        className={cn(
          'mx-auto flex w-fit flex-col justify-center space-y-4 p-5',
          className
        )}
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        {...props}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
          <CardTitle id="calendar-heading">Calendar</CardTitle>
          {!isOpen && (
            <BasicTooltip label="Go to reminders">
              <Button
                id="go-to-reminders"
                variant="ghost"
                aria-label="Go to Reminders"
                className="size-fit rounded-md p-2"
                onClick={toggleView}
              >
                <ArrowRight aria-hidden="true" />
              </Button>
            </BasicTooltip>
          )}
        </CardHeader>
        <div className="flex grow flex-col justify-between space-y-4">
          <CardContent className="p-0">
            <Calendar
              mode="single"
              month={month}
              onMonthChange={setMonth}
              selected={date}
              onSelect={onCalendarSelect}
              className="mx-auto flex h-80 w-min items-center rounded-md border"
            />
          </CardContent>
          <CardFooter className="flex justify-between p-0">
            <Button
              id="go-to-today"
              variant="link"
              size="sm"
              className="text-card-foreground/80 hover:text-card-foreground hover:no-underline"
              onClick={() => setMonth(today)}
            >
              Go to Today
            </Button>
            <Button
              id="go-to-selected"
              variant="link"
              size="sm"
              className="text-card-foreground/80 hover:text-card-foreground hover:no-underline"
              onClick={() => setMonth(date)}
            >
              Go to Selected
            </Button>
          </CardFooter>
        </div>
      </motion.div>
    )
  );
}
