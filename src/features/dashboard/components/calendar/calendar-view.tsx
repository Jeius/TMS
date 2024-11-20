'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { HTMLMotionProps, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import React, { useMemo } from 'react';
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
  const queryClient = useQueryClient();
  const today = useMemo(() => new Date(), []);
  const [month, setMonth] = React.useState<Date>(today);
  const { data: date = today } = useQuery<Date>({
    queryKey: ['calendar', 'date'],
  });

  const toggleView = () => setView && setView('reminders');

  const setDate = (date?: Date) => {
    if (date) queryClient.setQueryData(['calendar', 'date'], date);
    toggleView();
  };

  //Set default states on mount
  React.useEffect(() => {
    queryClient.setQueryData(['calendar', 'date'], today);
    queryClient.setQueryData(['calendar', 'view'], true);
  }, [queryClient, today]);

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
        <Tooltip>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
            <CardTitle id="calendar-heading">Calendar</CardTitle>
            {!isOpen && (
              <TooltipTrigger asChild>
                <Button
                  id="go-to-reminders"
                  variant="ghost"
                  aria-label="Go to Reminders"
                  className="size-fit rounded-md p-1"
                  onClick={toggleView}
                >
                  <ArrowRight aria-hidden="true" className="size-5" />
                </Button>
              </TooltipTrigger>
            )}
          </CardHeader>
          <div className="flex grow flex-col justify-between space-y-4">
            <CardContent className="p-0">
              <Calendar
                mode="single"
                month={month}
                onMonthChange={setMonth}
                selected={date}
                onSelect={setDate}
                className="mx-auto flex h-[20rem] w-min items-center rounded-md border"
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
          <TooltipContent className="mr-2">
            <p>Go to Reminders</p>
          </TooltipContent>
        </Tooltip>
      </motion.div>
    )
  );
}
