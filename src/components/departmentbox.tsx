"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const departments = [
    {
        value: "CA",
        label: "CA Department",
    },
    {
        value: "CS",
        label: "CS Department",
    },
    {
        value: "IS",
        label: "IS Department",
    },
    {
        value: "IT",
        label: "IT Department",
    },
]

export const Departmentbox = () => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between text-black dark:text-white hover:text-zinc-500 dark:hover:text-zinc-400"
                >
                    {value
                        ? departments.find((department) => department.value === value)?.label
                        : "Select department..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command >
                    <CommandInput placeholder="Search department..." />
                    <CommandList>
                        <CommandEmpty>No department found.</CommandEmpty>
                        <CommandGroup>
                            {departments.map((department) => (
                                <CommandItem
                                    key={department.value}
                                    value={department.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === department.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {department.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
