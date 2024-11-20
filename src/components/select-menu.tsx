import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
import { Separator } from './ui/separator';

type SelectMenuItem = {
  value: string;
  label: string;
};

type SelectMenuProps = {
  items?: SelectMenuItem[];
  placeholder?: string;
  title?: string;
  defaultValue?: string;
  onValueChanged?: (value: string) => void;
};

const SelectMenu = React.forwardRef<
  React.ElementRef<typeof SelectTrigger>,
  React.ComponentPropsWithoutRef<typeof SelectTrigger> & SelectMenuProps
>(
  (
    {
      items = [],
      defaultValue = '',
      placeholder = 'Select item..',
      title,
      onValueChanged = () => {},
    },
    ref
  ) => (
    <Select defaultValue={defaultValue} onValueChange={onValueChanged}>
      <SelectTrigger
        ref={ref}
        className="size-min space-x-1 p-2 pl-3 text-xs font-semibold hover:bg-accent"
      >
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
          {items?.map((item) => (
            <SelectItem key={item.value} value={item.value.toString()}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
);

SelectMenu.displayName = 'SelectMenu';

export { SelectMenu };
export type { SelectMenuItem };
