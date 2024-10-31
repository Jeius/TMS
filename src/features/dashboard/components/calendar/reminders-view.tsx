'use client'

import { Button } from '@/components/ui/button'
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { HTMLMotionProps, motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { CalendarViews } from './calendar-card'
import RemindersItems from './reminders-items'

type ReminderViewProps = HTMLMotionProps<'div'> & {
    open?: boolean
    view?: CalendarViews
    setView?: (value: CalendarViews) => void
};

export default function RemindersView({
    open: isOpen, view, setView, className, ...props
}: ReminderViewProps) {
    const { data: date } = useQuery<Date>({ queryKey: ['calendar', 'date'] });
    const toggleView = () => setView && setView('calendar');

    return (
        (isOpen || view === 'reminders') && (
            <motion.div
                id='reminders'
                className={cn('flex flex-col grow p-5', className)}
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                {...props}
            >
                <Tooltip>
                    <CardHeader className="flex p-0 flex-row space-y-0 items-center">
                        {!isOpen && (
                            <TooltipTrigger asChild>
                                <Button
                                    id="go-to-calendar"
                                    aria-label="Go to calendar"
                                    variant="ghost"
                                    onClick={toggleView}
                                    className="size-fit p-1 mr-2 rounded-md"
                                >
                                    <ArrowLeft className="size-5" />
                                </Button>
                            </TooltipTrigger>
                        )}
                        <CardTitle>Reminders</CardTitle>
                    </CardHeader>
                    <CardDescription className="text-right text-foreground font-semibold text-xs">
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
                    <TooltipContent>
                        <p>Go to Calendar</p>
                    </TooltipContent>
                </Tooltip>
            </motion.div>
        )
    )
}

