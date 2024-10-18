
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import React from "react";
import { Separator } from "./ui/separator";

export type SelectMenuItem = {
    value: string;
    label: string;
};

type SelectMenuProps = {
    items?: SelectMenuItem[];
    placeholder?: string;
    title?: string;
    defaultValue?: string,
    onValueChanged?: (value: string) => void;
}

export const SelectMenu = React.forwardRef<
    React.ElementRef<typeof SelectTrigger>,
    React.ComponentPropsWithoutRef<typeof SelectTrigger> & SelectMenuProps
>(({
    items = [],
    defaultValue = "",
    placeholder = "Select item..",
    title,
    onValueChanged = () => { }
}, ref) => (
    <Select defaultValue={defaultValue} onValueChange={onValueChanged}>
        <SelectTrigger ref={ref} className="size-min p-2 pl-3 text-xs font-semibold space-x-1 hover:bg-accent">
            <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                {title && (
                    <>
                        <SelectLabel>{title}</SelectLabel>
                        <Separator orientation="horizontal" />
                    </>
                )}
                {items?.map(item => (
                    <SelectItem key={item.value}
                        value={item.value.toString()}

                    >
                        {item.label}
                    </SelectItem>
                ))}
            </SelectGroup>
        </SelectContent>
    </Select>
))
