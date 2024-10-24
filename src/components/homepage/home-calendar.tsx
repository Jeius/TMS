"use client"

import useWindowSize from "@/lib/hooks/use-window-size";
import { cn, Screens } from "@/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { HTMLMotionProps, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React, { useEffect, useMemo } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import RemindersView from "./reminders";

type CalendarViewProps = HTMLMotionProps<"div"> & { open?: boolean };

function CalendarView({ open: isOpen, className, ...props }: CalendarViewProps) {
    const queryClient = useQueryClient();
    const today = useMemo(() => new Date(), []);
    const [month, setMonth] = React.useState<Date>(today);
    const { data: date = today } = useQuery<Date>({ queryKey: ["calendar", "date"] });
    const { data: isCalendarInView = true } = useQuery<boolean>({ queryKey: ["calendar", "view"] });

    const toggleView = () => queryClient.setQueryData(["calendar", "view"], !isCalendarInView);

    const setDate = (date?: Date) => {
        date && queryClient.setQueryData(["calendar", "date"], date);
        toggleView();
    };

    //Set default states on mount
    React.useEffect(() => {
        queryClient.setQueryData(["calendar", "date"], today);
        queryClient.setQueryData(["calendar", "view"], true);
    }, [queryClient, today]);

    return (
        (isOpen || isCalendarInView) && (
            <Tooltip>
                <motion.div
                    id='calendar'
                    key="calendar"
                    className={cn("flex flex-col w-min mx-auto p-5 space-y-4 justify-center", className)}
                    initial={false}
                    animate={{ x: [-60, 0], opacity: [0, 1] }}
                    {...props}
                >
                    <CardHeader className="flex p-0 flex-row justify-between space-y-0 items-center">
                        <CardTitle>Calendar</CardTitle>
                        {!isOpen && (
                            <TooltipTrigger asChild>
                                <Button
                                    id='go-to-reminders'
                                    variant="ghost"
                                    aria-label="Go to Reminders"
                                    className="size-fit p-1 rounded-md"
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
                                className="flex items-center rounded-md border h-[320px] w-min mx-auto" />
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
                <TooltipContent className="mr-2">
                    <p>Go to Reminders</p>
                </TooltipContent>
            </Tooltip>
        )
    );
}

export default function HomeCalendar({ className, ...props }: React.ComponentPropsWithRef<typeof Card>) {
    const [open, setOpen] = React.useState(false);
    const { width: windowWidth } = useWindowSize();
    const width = open ? 600 : 300;

    useEffect(() => {
        if (windowWidth >= Screens["2xl"]) {
            !open && setOpen(true);
            return;
        }
        if (windowWidth <= Screens["lg"] && windowWidth >= Screens["md"]) {
            !open && setOpen(true);
            return;
        }
        open && setOpen(false);
    }, [windowWidth, open]);

    return (
        <motion.div
            animate={{ width: width }}
            transition={{ type: "tween", duration: 0.2, }}
        >
            <Card id="calendar/reminders-card" variant="glass"
                className={cn("flex overflow-hidden w-full h-[450px]", className)}
                {...props}
            >
                <CalendarView open={open} />
                <RemindersView open={open} />
            </Card>
        </motion.div>
    );
}