"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import React from "react"
import { TooltipWrapper } from "@/components/ui/tooltip"
import { CheckCheck, Trash2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

const reminders = [
    {
        id: "reminder 1",
        label: "reminder 1",
    },
    {
        id: "reminder 2",
        label: "reminder 2",
    },
    {
        id: "reminder 3",
        label: "reminder 3",
    },
    {
        id: "reminder 4",
        label: "reminder 4",
    },
    {
        id: "reminder 5",
        label: "reminder 5",
    },
] as const

const FormSchema = z.object({
    reminders: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
})

export function RemindersItems() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            reminders: []
        }
    })

    const [allChecked, setAllChecked] = React.useState(false)

    const [onSubmit, setOnSubmit] = React.useState<(data: z.infer<typeof FormSchema>) => void>(() => { })

    const markDone = (data: z.infer<typeof FormSchema>) => {
        toast({
            title: "Marked as done:",
            description: (
                <p>item</p>
            ),
        })
    }

    React.useEffect(() => {
        // Check if all items are currently selected.
        const isAllChecked = reminders.every((reminder) =>
            form.getValues("reminders").includes(reminder.id)
        )
        setAllChecked(isAllChecked)
    }, [form.watch("reminders")])

    const deleteSelected = (data: z.infer<typeof FormSchema>) => {
        toast({
            title: "Deleted:",
            description: (
                <p>{data.reminders.join(", ")}</p>
            ),
        })
    }

    const handleSelectAll = () => {
        if (allChecked) {
            form.setValue("reminders", [])
        } else {
            form.setValue(
                "reminders",
                reminders.map((reminder) => reminder.id)
            )
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between space-y-8">
                <FormField
                    control={form.control}
                    name="reminders"
                    render={() => (
                        <FormItem>
                            <ScrollArea className="border-y h-[320px] w-[250px] 2xl:w-auto p-2 pb-4">
                                {reminders.map((reminder) => (
                                    <FormField
                                        key={reminder.id}
                                        control={form.control}
                                        name="reminders"
                                        render={({ field }) => {
                                            return (
                                                <FormItem
                                                    key={reminder.id}
                                                    className="flex flex-row items-center space-x-3 space-y-0 hover:bg-accent p-1.5 rounded-md"
                                                >
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(reminder.id)}
                                                            onCheckedChange={(checked) => {
                                                                return checked
                                                                    ? field.onChange([...field.value, reminder.id])
                                                                    : field.onChange(
                                                                        field.value?.filter(
                                                                            (value) => value !== reminder.id
                                                                        )
                                                                    )
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal text-sm">
                                                        {reminder.label}
                                                    </FormLabel>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                ))}
                            </ScrollArea>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-between items-center pb-4 2xl:pb-6 pt-0">
                    <Button aria-label="Mark as done" variant="ghost" className="text-xs p-2"
                        type="submit" onClick={() => setOnSubmit(markDone)}
                    >
                        Mark as done
                    </Button>
                    <div className="flex space-x-1">
                        <TooltipWrapper label={allChecked ? "Unselect all" : "Select all"}>
                            <Button aria-label="Select all" variant={allChecked ? "default" : "ghost"} className="size-fit p-2 data"
                                type="button" onClick={handleSelectAll}
                            >
                                <CheckCheck aria-hidden="true" className="size-4" />
                            </Button>
                        </TooltipWrapper>

                        <TooltipWrapper label="Delete Selected" className="mr-10">
                            <Button aria-label="Delete selected" variant="ghost" className="size-fit p-2"
                                type="submit" onClick={() => setOnSubmit(deleteSelected)}
                            >
                                <Trash2 aria-hidden="true" className="size-4" />
                            </Button>
                        </TooltipWrapper>
                    </div>
                </div>
            </form>
        </Form>
    )
}
