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
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Check, ChevronDown } from "lucide-react"
import * as React from "react"

export type ComboboxItem = {
    value?: string;
    label?: string;
}

type ComboboxProps = React.ComponentPropsWithRef<typeof Button> & {
    items?: ComboboxItem[]
    onValueChanged?: (value: string) => void
    placeholder?: string
    defaultValue?: string
}

export function Combobox({
    items = [],
    placeholder = "Item",
    defaultValue = "",
    className,
    variant = "outline",
    onValueChanged = () => { },
    ...props
}: ComboboxProps) {
    const [open, setOpen] = React.useState(false)
    const [selectedValue, setSelectedValue] = React.useState(defaultValue)

    const handleSelect = (value: string) => {
        setSelectedValue(value === selectedValue ? "" : value)
        onValueChanged(value === selectedValue ? "" : value)
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={variant}
                    role="combobox"
                    aria-expanded={open}
                    data-selected={open}
                    size="sm"
                    className={cn("w-min justify-between text-foreground font-semibold", className)}
                    {...props}
                >
                    <span className="capitalize mr-2">
                        {selectedValue
                            ? items?.find((item) => item.value === selectedValue)?.label
                            : placeholder}
                    </span>
                    <motion.div
                        style={{ transformOrigin: "center" }}
                        animate={{ rotate: open ? 180 : 0 }}
                        aria-hidden="true"
                    >
                        <ChevronDown size={16} className="opacity-50" />
                    </motion.div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="max-w-fit z-40 p-0">
                <Command>
                    <CommandInput className="text-xs font-semibold" placeholder={`Search ${placeholder.toLowerCase()}...`} />
                    <CommandList className="max-h-52 p-2">
                        <CommandEmpty>Nothing found...</CommandEmpty>
                        <CommandGroup>
                            {items?.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.value}
                                    onSelect={handleSelect}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedValue === item.value ? "opacity-100" : "opacity-0"
                                        )} />
                                    <span className="capitalize whitespace-nowrap text-xs font-semibold">{item.label}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
