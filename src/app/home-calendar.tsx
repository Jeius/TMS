"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Calendar } from "@/components/ui/calendar"
import { Button } from '@/components/ui/button'
import { toast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowLeft, ArrowRight, CheckCheck, Trash2 } from 'lucide-react'
import { ConfirmationDialogWrapper } from '@/components/ui/dialog'
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
    TooltipTrigger,
    TooltipWrapper
} from '@/components/ui/tooltip'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

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

// Constant list of reminders, fetch from database
const REMINDERS = [
    { id: "reminder 1", label: "Reminder 1" },
    { id: "reminder 2", label: "Reminder 2" },
    { id: "reminder 3", label: "Reminder 3" },
    { id: "reminder 4", label: "Reminder 4" },
    { id: "reminder 5", label: "Reminder 5" },
] as const

// Zod validation schema
const FormSchema = z.object({
    reminders: z.array(z.string()),
})

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
                            aria-label="Go to Reminders"
                            onClick={toggleView}
                            className="sm:hidden lg:block 2xl:hidden size-fit p-1 rounded-md"
                        >
                            <ArrowRight aria-hidden="true" className="size-5" />
                        </Button>
                    </TooltipTrigger>
                </CardHeader>
                <div className="flex grow flex-col justify-between">
                    <CardContent className="py-0">
                        <Calendar
                            mode="single"
                            month={month}
                            onMonthChange={setMonth}
                            selected={date}
                            onSelect={setDate}
                            className="flex items-center rounded-md border h-[320px]"
                        />
                    </CardContent>
                    <CardFooter className="flex justify-between pb-4 pt-2">
                        <Button
                            id="go-to-today"
                            variant="ghost"
                            className="p-2 size-fit"
                            onClick={() => setMonth(today)}
                        >
                            Go to Today
                        </Button>
                        <Button
                            id="go-to-selected"
                            variant="ghost"
                            className="p-2 size-fit"
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

const RemindersItems = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            reminders: [],
        },
    })

    const [allChecked, setAllChecked] = React.useState(false)

    // Effect to update 'allChecked' state when 'reminders' field changes
    React.useEffect(() => {
        const currentReminders = form.watch("reminders")
        const isAllChecked = REMINDERS.every((reminder) => currentReminders.includes(reminder.id))
        setAllChecked(isAllChecked)
    }, [form.watch("reminders")])

    const handleMarkDone = () => {
        const selectedReminders = form.getValues("reminders")
        form.setValue("reminders", [])
        showToast("Done", selectedReminders)
    }

    const handleDeleteSelected = () => {
        const selectedReminders = form.getValues("reminders")
        showToast("Deleted", selectedReminders)
    }

    const showToast = (title: string, reminders: string[]) => {
        if (reminders.length) {
            toast({
                title,
                description: (
                    <div className="flex flex-col pl-2">{
                        reminders.map(reminder => (
                            <span>{reminder}</span>
                        ))
                    }</div>
                ),
            })
        } else {
            toast({ title: "No reminders selected" })
        }

    }

    // Toggle select/unselect all reminders
    const handleSelectAll = () => {
        const newReminders = allChecked ? [] : REMINDERS.map((reminder) => reminder.id)
        form.setValue("reminders", newReminders)
    }

    const ReminderItem = ({ id, label }: { id: string; label: string }) => (
        <FormField
            key={id}
            control={form.control}
            name="reminders"
            render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 hover:bg-accent p-1.5 rounded-md">
                    <FormControl>
                        <Checkbox
                            checked={field.value.includes(id)}
                            onCheckedChange={(checked) => {
                                field.onChange(
                                    checked
                                        ? [...field.value, id]
                                        : field.value.filter((value) => value !== id)
                                )
                            }}
                        />
                    </FormControl>
                    <FormLabel className="font-normal text-sm">{label}</FormLabel>
                </FormItem>
            )}
        />
    )

    return (
        <Form {...form}>
            <form className="h-full flex flex-col justify-between">
                <FormField
                    control={form.control}
                    name="reminders"
                    render={() => (
                        <FormItem>
                            <ScrollArea className="border-y h-[320px] w-[250px] 2xl:w-auto p-2 pb-4">
                                {REMINDERS.map(({ id, label }) => (
                                    <ReminderItem key={id} id={id} label={label} />
                                ))}
                            </ScrollArea>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {form.watch("reminders").length !== 0 && (
                    <div className="flex justify-between items-center pb-4 pt-2">
                        <Button
                            aria-label="Mark as done"
                            variant="ghost"
                            className="text-xs p-2"
                            type="button"
                            onClick={handleMarkDone}
                        >
                            Mark as done
                        </Button>
                        <div className="flex space-x-1">
                            <TooltipWrapper label={allChecked ? "Unselect all" : "Select all"}>
                                <Button
                                    aria-label="Select all"
                                    variant={allChecked ? "default" : "ghost"}
                                    className="size-fit p-2 data"
                                    type="button"
                                    onClick={handleSelectAll}
                                >
                                    <CheckCheck aria-hidden="true" className="size-4" />
                                </Button>
                            </TooltipWrapper>

                            <Tooltip>
                                <ConfirmationDialogWrapper dialogTitle="Confirm Delete" onConfirm={handleDeleteSelected}>
                                    <TooltipTrigger asChild>
                                        <Button
                                            aria-label="Delete"
                                            variant="ghost"
                                            className="size-fit p-2"
                                            type="button"
                                        >
                                            <Trash2 aria-hidden="true" className="size-4" />
                                        </Button>
                                    </TooltipTrigger>
                                </ConfirmationDialogWrapper>
                                <TooltipContent className="mr-5"><span>Delete</span></TooltipContent>
                            </Tooltip>
                        </div>
                    </div>
                )}
            </form>
        </Form>
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
                            aria-label="Go to calendar"
                            variant="ghost"
                            onClick={toggleView}
                            className="sm:hidden lg:block 2xl:hidden size-fit p-1 mr-2 rounded-md"
                        >
                            <ArrowLeft className="size-5" />
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
                <CardContent className="grow 2xl:pl-0 pb-0">
                    <RemindersItems />
                </CardContent>
            </Card>
            <TooltipContent>
                <p>Go to Calendar</p>
            </TooltipContent>
        </Tooltip>
    )
}

export default function HomeCalendar() {
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
            className={`flex items-stretch transition-all duration-500 overflow-hidden w-[300px] sm:w-[600px] lg:w-[300px] 2xl:w-[600px] ${isViewToggled ? 'justify-end' : 'justify-start'}`}
        >
            <TooltipProvider>
                <CalendarView
                    today={today}
                    month={month}
                    setMonth={setMonth}
                    date={date}
                    setDate={setDate}
                    toggleView={toggleView}
                    className={`flex flex-col transition-all duration-500 transform border-none shadow-none sm:translate-x-0 sm:opacity-100 2xl:translate-x-0 2xl:opacity-100 ${isViewToggled ? 'translate-x-[-50%] opacity-0 lg:translate-x-[-50%] lg:opacity-0' : 'translate-x-0 opacity-100 lg:translate-x-0 lg:opacity-100'}`}
                />
                <RemindersView
                    date={date}
                    toggleView={toggleView}
                    className={`flex flex-col sm:grow lg:grow-0 2xl:grow transition-all duration-500 border-none shadow-none transform sm:translate-x-0 sm:opacity-100 2xl:translate-x-0 2xl:opacity-100 ${isViewToggled ? 'translate-x-0 opacity-100 lg:translate-x-0 lg:opacity-100' : 'translate-x-[50%] opacity-0 lg:translate-x-[50%] lg:opacity-0'}`}
                />
            </TooltipProvider>
        </Card>
    );
}