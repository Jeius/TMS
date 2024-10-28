import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Check, ChevronsDownUpIcon, ChevronsUpDownIcon } from 'lucide-react'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { ScrollArea } from './ui/scroll-area'
import { Skeleton } from './ui/skeleton'

export type ComboboxItem = {
    value?: string;
    label?: string;
}

type ComboboxProps = React.ComponentPropsWithRef<typeof Button> & {
    onValueChanged?: (value: string) => void
    placeholder: string
    defaultValue?: string
    itemsFn: (() => Promise<string[]>) | (() => string[])
}

export function Combobox({
    placeholder,
    defaultValue = '',
    className,
    variant = 'outline',
    onValueChanged = () => { },
    itemsFn,
    ...props
}: ComboboxProps) {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(defaultValue);
    const [searchTerm, setSearchTerm] = useState('');
    const firstItemRef = useRef<HTMLButtonElement | null>(null);

    const { data: items = [], isLoading, refetch } = useQuery<string[]>({
        queryKey: [placeholder],
        queryFn: itemsFn,
        staleTime: 60 * 1000,
        refetchOnMount: true,
        refetchInterval: 60 * 1000,
    });

    const filteredItems = items.filter(
        item => item.toLowerCase().split(' ').join('').includes(
            searchTerm.toLowerCase().split(' ').join('')
        )
    );

    const handleSelect = (value: string) => {
        setSelectedValue(value === selectedValue ? '' : value);
        onValueChanged(value === selectedValue ? '' : value);
        setOpen(false);
        setSearchTerm('');
    };

    useEffect(() => {
        if (open && firstItemRef.current) {
            firstItemRef.current.focus();
        }
    }, [open, firstItemRef])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={variant}
                    role="combobox"
                    aria-expanded={open}
                    data-selected={open}
                    size="sm"
                    className={cn('w-min justify-between text-foreground font-semibold', className)}
                    onClick={() => !open && refetch()}
                    {...props}
                >
                    <span className="capitalize mr-2">
                        {selectedValue
                            ? items.find((item) => item === selectedValue) ?? selectedValue
                            : placeholder}
                    </span>
                    <motion.div
                        style={{ transformOrigin: 'center' }}
                        animate={{ rotate: open ? 180 : 0 }}
                        aria-hidden="true"
                    >
                        {open
                            ? <ChevronsDownUpIcon size={16} className="opacity-50" />
                            : <ChevronsUpDownIcon size={16} className="opacity-50" />}
                    </motion.div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="z-40 p-0 w-min min-w-36">
                <div className="flex items-center border-b px-3">
                    <MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={`Search ${placeholder.toLowerCase()}...`}
                        className={cn(
                            'flex h-10 w-full rounded-md bg-transparent py-3 text-xs font-semibold outline-none',
                            'placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
                        )}
                    />
                </div>
                <ScrollArea className="flex flex-col h-min max-h-52 space-y-1 p-2">
                    {isLoading ? (
                        <div className="w-40">
                            {Array.from({ length: 5 }).map(() => (
                                <Skeleton key={crypto.randomUUID()} className="mb-2 h-8 w-full" />
                            ))}
                        </div>
                    ) : (
                        filteredItems?.length === 0
                            ? <p className="w-40 text-xs text-center py-4">No results found...</p>
                            : filteredItems?.map((item, index) => (
                                <Button
                                    key={item}
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleSelect(item)}
                                    ref={index === 0 ? firstItemRef : null}
                                    className="w-full justify-start"
                                >
                                    <Check className={cn(
                                        'mr-2 h-4 w-4',
                                        selectedValue === item ? 'opacity-100' : 'opacity-0'
                                    )} />
                                    <span className="capitalize whitespace-nowrap text-xs font-semibold">{item}</span>
                                </Button>
                            ))
                    )}
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
}
