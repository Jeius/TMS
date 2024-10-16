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

export type ComboboxItem = {
    value: string
    label: string
}

type ComboboxProps = React.ComponentPropsWithRef<typeof Button> & {
    items: ComboboxItem[]
    onMenuSelect?: (value: string) => void
    placeholder?: string
    defaultValue?: string
    buttonClassName?: string
    buttonVariant?: "link" | "outline" | "default" | "destructive" | "secondary" | "ghost" | null | undefined
}

export const Combobox: React.FC<ComboboxProps> = ({
    items,
    onMenuSelect = () => { },
    placeholder = "Item",
    defaultValue = "",
    buttonClassName = "",
    buttonVariant = "outline",
    ...props
}) => {
    const [open, setOpen] = React.useState(false)
    const [selectedValue, setSelectedValue] = React.useState(defaultValue)

    const handleSelect = (value: string) => {
        setSelectedValue(value === selectedValue ? "" : value) // Toggle selection
        onMenuSelect(value === selectedValue ? "" : value)
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={buttonVariant}
                    role="combobox"
                    aria-expanded={open}
                    size="sm"
                    className={cn("w-fit justify-between bg-card text-foreground", buttonClassName)}
                    {...props}
                >
                    {selectedValue
                        ? items.find((item) => item.value === selectedValue)?.label
                        : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder={`Select ${placeholder.toLowerCase()}...`} />
                    <CommandList className="max-h-52">
                        <CommandEmpty>Nothing found...</CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.value}
                                    onSelect={handleSelect}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedValue === item.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {item.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
