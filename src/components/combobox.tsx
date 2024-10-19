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
import { Check, ChevronsUpDown } from "lucide-react"
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

export const Combobox: React.FC<ComboboxProps> = ({
    items = [],
    placeholder = "Item",
    defaultValue = "",
    className,
    variant = "outline",
    onValueChanged = () => { },
    ...props
}) => {
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
                    size="sm"
                    className={cn("w-fit justify-between text-foreground", className)}
                    {...props}
                >
                    <span className="capitalize">
                        {selectedValue
                            ? items?.find((item) => item === selectedValue)?.label
                            : placeholder}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder={`Select ${placeholder.toLowerCase()}...`} />
                    <CommandList className="max-h-52">
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
                                            selectedValue === item ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    <span className="capitalize">{item.label}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
