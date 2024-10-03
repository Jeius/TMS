"use client"

import React from 'react'
import { Calendar } from "@/components/ui/calendar"
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip'


export default function AppCalendar() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [isDateSelected, setIsDateSelected] = React.useState(false);

    React.useEffect(() => {
        setIsDateSelected((prev) => !prev);
    }, [date]);

    return (
        <div id="calendar/reminders-card"
            className={`hidden lg:flex transition-all duration-500 bg-card overflow-hidden w-[300px] h-[380px] border rounded-lg space-x-5 2xl:space-x-0 2xl:w-[600px] ${isDateSelected ? 'justify-end 2xl:justify-between' : 'justify-start 2xl:justify-between'}`}
        >
            {/* Calendar Card */}
            <TooltipProvider>
                <Tooltip>
                    <Card
                        className={`transition-all duration-500 transform ${isDateSelected ? 'translate-x-[-50%] opacity-0' : 'translate-x-0 opacity-100'} border-none shadow-none 2xl:translate-x-0 2xl:opacity-100`}
                    >
                        <CardHeader className="flex py-4 2xl:py-6 flex-row justify-between space-y-0 items-center">
                            <CardTitle>Calendar</CardTitle>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    onClick={() => setIsDateSelected(!isDateSelected)}
                                    className="2xl:hidden size-fit p-1 rounded-md"
                                >
                                    <ArrowRight aria-hidden className="size-5" />
                                    <span className="sr-only">Go to Reminders</span>
                                </Button>
                            </TooltipTrigger>
                        </CardHeader>
                        <CardContent className="flex space-x-5 overflow-hidden">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border"
                            />
                        </CardContent>
                    </Card>
                    <TooltipContent className="mr-2">
                        <p>Go to Reminders</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            {/* Reminders Card */}
            <TooltipProvider>
                <Tooltip>
                    <Card
                        className={`transition-all duration-500 transform ${isDateSelected ? 'translate-x-0 opacity-100' : 'translate-x-[50%] opacity-0'} border-none shadow-none 2xl:translate-x-0 2xl:opacity-100`}
                    >
                        <CardHeader className="flex py-4 2xl:py-6 flex-row space-y-0 items-center">
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    onClick={() => setIsDateSelected(!isDateSelected)}
                                    className="2xl:hidden size-fit p-1 mr-2 rounded-md"
                                >
                                    <ArrowLeft aria-hidden className="size-5" />
                                    <span className="sr-only">Go to Calendar</span>
                                </Button>
                            </TooltipTrigger>
                            <CardTitle>Reminders</CardTitle>
                        </CardHeader>
                        <CardDescription className="flex justify-center">
                            {date?.toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </CardDescription>
                        <CardContent className="flex space-x-5 overflow-hidden w-[300px]">
                            <div className="size-full">Reminders</div>
                        </CardContent>
                    </Card>
                    <TooltipContent>
                        <p>Go to Calendar</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}

