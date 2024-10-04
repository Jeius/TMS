"use client"

import React from 'react'
import { Calendar } from "@/components/ui/calendar"
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Check, Trash2 } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip'
import { ScrollArea } from '@/components/ui/scroll-area'

interface CalendarViewProps extends React.ComponentPropsWithRef<typeof Card> {
    today: Date;
    month?: Date;
    setMonth: React.Dispatch<React.SetStateAction<Date | undefined>>;
    date: Date | undefined;
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    toggleView: () => void;
}

interface ReminderViewProps extends React.ComponentPropsWithRef<typeof Card> {
    date: Date | undefined;
    toggleView: () => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({
    month, setMonth, date, setDate, today, toggleView, ...props
}) => {
    return (
        <Tooltip>
            <Card
                id='calendar'
                {...props}
            >
                <CardHeader className="flex py-4 2xl:py-6 flex-row justify-between space-y-0 items-center">
                    <CardTitle>Calendar</CardTitle>
                    <TooltipTrigger asChild>
                        <Button
                            id='go-to-reminders'
                            variant="ghost"
                            onClick={toggleView}
                            className="2xl:hidden size-fit p-1 rounded-md"
                        >
                            <ArrowRight aria-hidden className="size-5" />
                            <span className="sr-only">Go to Reminders</span>
                        </Button>
                    </TooltipTrigger>
                </CardHeader>
                <div className="flex grow flex-col justify-between">
                    <CardContent className="inset-y-5">
                        <Calendar
                            mode="single"
                            month={month}
                            onMonthChange={setMonth}
                            selected={date}
                            onSelect={setDate}
                            className="flex items-center rounded-md border h-[320px]"
                        />
                    </CardContent>
                    <CardFooter className="flex justify-between pb-6 pt-0">
                        <Button
                            id="go-to-today"
                            variant="link"
                            className="text-foreground p-0 size-fit"
                            onClick={() => setMonth(today)}
                        >
                            Go to Today
                        </Button>
                        <Button
                            id="go-to-selected"
                            variant="link"
                            className="text-foreground p-0 size-fit"
                            onClick={() => setMonth(date)}
                        >
                            Go to Selected
                        </Button>
                    </CardFooter>
                </div>
            </Card>
            <TooltipContent className="mr-2">
                <p>Go to Reminders</p>
            </TooltipContent>
        </Tooltip>
    )
}

const RemindersView: React.FC<ReminderViewProps> = ({
    date, toggleView, ...props
}) => {
    return (
        <Tooltip>
            <Card
                id='reminders'
                {...props}
            >
                <CardHeader className="flex pt-4 pb-1 2xl:pl-0 2xl:pt-6 flex-row space-y-0 items-center">
                    <TooltipTrigger asChild>
                        <Button
                            id="go-to-calendar"
                            variant="ghost"
                            onClick={toggleView}
                            className="2xl:hidden size-fit p-1 mr-2 rounded-md"
                        >
                            <ArrowLeft aria-hidden className="size-5" />
                            <span className="sr-only">Go to Calendar</span>
                        </Button>
                    </TooltipTrigger>
                    <CardTitle>Reminders</CardTitle>
                </CardHeader>
                <CardDescription className="flex justify-center text-foreground font-semibold">
                    {date?.toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </CardDescription>

                <div className="flex grow flex-col justify-between">
                    <CardContent className="2xl:pl-0">
                        <ScrollArea className="border-y h-full max-h-[320px] w-[250px] 2xl:w-auto">
                            <ul className="flex flex-col items-start justify-start text-sm pb-4">
                                {Array.from({ length: 20 }).map((_, index) => (
                                    <li
                                        key={index}
                                    >
                                        Checkbox Reminder {index + 1}
                                    </li>
                                ))}
                            </ul>
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-1 pb-4 2xl:pb-6 pt-0">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button id="mark-as-done" variant="ghost" className="size-fit p-2">
                                    <Check aria-hidden className="size-4" />
                                    <span className="sr-only">Mark as done</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Mark as done</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button id="delete-selected" className="size-fit p-2">
                                    <Trash2 aria-hidden className="size-4" />
                                    <span className="sr-only">Delete selected</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="mr-10">
                                <p>Delete selected</p>
                            </TooltipContent>
                        </Tooltip>
                    </CardFooter>
                </div>
            </Card>
            <TooltipContent>
                <p>Go to Calendar</p>
            </TooltipContent>
        </Tooltip>
    )
}

export default function AppCalendar() {
    const today = new Date();
    const [month, setMonth] = React.useState<Date | undefined>(today);
    const [date, setDate] = React.useState<Date | undefined>(today);
    const [isViewToggled, setIsViewToggled] = React.useState(false);

    const toggleView = () => {
        setIsViewToggled(!isViewToggled)
    }

    React.useEffect(() => {
        setIsViewToggled((prev) => !prev);
    }, [date]);

    return (
        <Card id="calendar/reminders-card"
            className={`flex items-stretch transition-all duration-500 overflow-hidden w-[300px] 2xl:w-[600px] ${isViewToggled ? 'justify-end 2xl:justify-evenly' : 'justify-start 2xl:justify-evenly'}`}
        >
            <TooltipProvider>
                <CalendarView
                    today={today}
                    month={month}
                    setMonth={setMonth}
                    date={date}
                    setDate={setDate}
                    toggleView={toggleView}
                    className={`flex flex-col transition-all duration-500 transform ${isViewToggled ? 'translate-x-[-50%] opacity-0' : 'translate-x-0 opacity-100'} border-none shadow-none 2xl:translate-x-0 2xl:opacity-100`}
                />
                <RemindersView
                    date={date}
                    toggleView={toggleView}
                    className={`flex flex-col 2xl:grow transition-all duration-500 border-none shadow-none 2xl:translate-x-0 2xl:opacity-100 transform ${isViewToggled ? 'translate-x-0 opacity-100' : 'translate-x-[50%] opacity-0'}`}
                />
            </TooltipProvider>
        </Card>
    );
}

