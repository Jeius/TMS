'use client'

import AlertDialogWrapper from '@/components/dialog-wrapper'
import { Button } from '@/components/ui/button'
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipWrapper
} from '@/components/ui/tooltip'
import { toast } from '@/lib/hooks/use-toast'
import { RemindersFormSchema } from '@/lib/types'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion'
import { ArrowLeft, CheckCheck, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ControllerRenderProps, useForm } from 'react-hook-form'
import { z } from 'zod'


// Constant list of reminders, fetch from database
const REMINDERS = [
    { id: 'reminder-1', label: 'Reminder 1' },
    { id: 'reminder-2', label: 'Reminder 2' },
    { id: 'reminder-3', label: 'Reminder 3' },
    { id: 'reminder-4', label: 'Reminder 4' },
    { id: 'reminder-5', label: 'Reminder 5' },
] as const


function RemindersItems() {
    const form = useForm<z.infer<typeof RemindersFormSchema>>({
        resolver: zodResolver(RemindersFormSchema),
        defaultValues: {
            reminders: [],
        },
    })

    const [allChecked, setAllChecked] = useState(false)

    useEffect(() => {
        const currentReminders = form.watch('reminders');
        setAllChecked(currentReminders.length === REMINDERS.length);
    }, [form]);


    const handleMarkDone = () => {
        const selectedReminders = form.getValues('reminders')
        form.setValue('reminders', [])
        showToast('Done', selectedReminders)
    }

    const handleDeleteSelected = () => {
        const selectedReminders = form.getValues('reminders')
        showToast('Deleted', selectedReminders)
    }

    const showToast = (title: string, reminders: string[]) => {
        if (reminders.length) {
            toast({
                title,
                description: (
                    <div className="flex flex-col pl-2">{reminders.map((reminder, index) => (
                        <span key={index}>{reminder}</span>
                    ))}</div>
                ),
            })
        } else {
            toast({ title: 'No reminders selected' })
        }

    }

    // Toggle select/unselect all reminders
    const toggleSelectAll = () => {
        const newReminders = allChecked ? [] : REMINDERS.map((reminder) => reminder.id)
        form.setValue('reminders', newReminders)
    }

    function ReminderItem({ id, label }: { id: string; label: string }) {
        const renderFormItem = ({ field }: {
            field: ControllerRenderProps<{
                reminders: string[];
            }, 'reminders'>
        }) => (
            <FormItem className="flex items-center w-full space-x-3 space-y-0 hover:bg-accent p-1.5 rounded-md">
                <FormControl>
                    <Checkbox
                        checked={field.value.includes(id)}
                        onCheckedChange={(checked) => {
                            field.onChange(
                                checked
                                    ? [...field.value, id]
                                    : field.value.filter((value: string) => value !== id)
                            )
                        }} />
                </FormControl>
                <FormLabel className="font-normal text-sm">{label}</FormLabel>
            </FormItem>
        )

        return (
            <FormField key={id} control={form.control} name="reminders" render={renderFormItem} />
        )
    }

    return (
        <Form {...form}>
            <form className="flex flex-col justify-between">
                <FormField
                    control={form.control}
                    name="reminders"
                    render={() => (
                        <FormItem>
                            <ScrollArea className="h-[320px] w-full space-y-1 px-1.5">
                                {REMINDERS.map(({ id, label }) => (
                                    <ReminderItem key={id} id={id} label={label} />
                                ))}
                            </ScrollArea>
                            <FormMessage />
                        </FormItem>
                    )} />
                <AnimatePresence>
                    {form.watch('reminders').length !== 0 && (
                        <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 10, opacity: 0 }}
                            transition={{ type: 'tween', duration: 0.1 }}
                            className="absolute bottom-0 left-0 right-0 flex justify-between items-center"
                        >
                            <Button
                                aria-label="Mark as done"
                                variant="link"
                                size="sm"
                                className="hover:no-underline text-card-foreground/80 hover:text-card-foreground"
                                type="button"
                                onClick={handleMarkDone}
                            >
                                Mark as done
                            </Button>
                            <div className="flex space-x-1">
                                <TooltipWrapper label={allChecked ? 'Unselect all' : 'Select all'}>
                                    <Button
                                        aria-label={allChecked ? 'Unselect all' : 'Select all'}
                                        variant={allChecked ? 'default' : 'ghost'}
                                        className="size-fit p-2 data"
                                        type="button"
                                        onClick={toggleSelectAll}
                                    >
                                        <CheckCheck aria-hidden="true" className="size-4" />
                                    </Button>
                                </TooltipWrapper>

                                <Tooltip>
                                    <AlertDialogWrapper dialogTitle="Confirm Delete" onConfirm={handleDeleteSelected}>
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
                                    </AlertDialogWrapper>
                                    <TooltipContent className="mr-5"><span>Delete</span></TooltipContent>
                                </Tooltip>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>
        </Form>
    )
}

type ReminderViewProps = HTMLMotionProps<'div'> & { open?: boolean };

export default function RemindersView({ open: isOpen, className, ...props }: ReminderViewProps) {
    const queryClient = useQueryClient()
    const { data: date } = useQuery<Date>({ queryKey: ['calendar', 'date'] })
    const { data: isCalendarInView = true } = useQuery<boolean>({ queryKey: ['calendar', 'view'] })

    const toggleView = () => queryClient.setQueryData(['calendar', 'view'], !isCalendarInView)

    return (
        (isOpen || !isCalendarInView) && (
            <Tooltip>
                <motion.div
                    id='reminders'
                    key="reminders"
                    className={cn('flex flex-col w-full p-5', className)}
                    initial={false}
                    animate={{ x: [60, 0], opacity: [0, 1] }}
                    {...props}
                >
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
                </motion.div>
                <TooltipContent>
                    <p>Go to Calendar</p>
                </TooltipContent>
            </Tooltip>
        )
    )
}

