import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { useInfiniteQuery } from '@tanstack/react-query'
import { motion, useInView } from 'framer-motion'
import { Check, ChevronsDownUpIcon, ChevronsUpDownIcon, Loader2 } from 'lucide-react'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { InView } from './animated/in-view'
import { ScrollArea } from './ui/scroll-area'

export type ComboboxFunction = (page: number, search: string) => Promise<{
    items: string[],
    currentPage: number
    nextPage?: number | null,
    search?: string
}>;

type ComboboxProps = React.ComponentPropsWithRef<typeof Button> & {
    placeholder: string;
    items?: string[];
    onValueChanged?: (value?: string) => void;
    queryKey: string[]
    queryFn: ComboboxFunction
}

export function Combobox({
    placeholder,
    defaultValue,
    className,
    variant = 'outline',
    onValueChanged = () => { },
    items: initialItems = [],
    queryKey,
    queryFn,
    ...props
}: ComboboxProps) {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(defaultValue);
    const [searchTerm, setSearchTerm] = useState('');
    const loaderRef = useRef(null);
    const inView = useInView(loaderRef)

    const { data, error, status, fetchNextPage, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey,
            queryFn: async ({ pageParam }) => await queryFn(pageParam, searchTerm),
            initialPageParam: 0,
            getNextPageParam: (lastPage) => lastPage.nextPage,
        });


    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const item = e.currentTarget.value;
        const value = item === selectedValue ? undefined : item;
        setSelectedValue(value);
        onValueChanged(value);
        setOpen(false);
        setSearchTerm('');
    };


    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={variant}
                    role="combobox"
                    aria-expanded={open}
                    data-selected={open}
                    size="sm"
                    className={cn('w-min justify-between capitalize text-xs', className)}
                    {...props}
                >
                    {selectedValue
                        ? <span className="font-semibold mr-2">{selectedValue}</span>
                        : <span className="text-foreground/80 mr-2">{placeholder}</span>
                    }
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
                <ScrollArea className="h-min max-h-52">
                    <ul className='flex flex-col space-y-1 p-2 items-center'>
                        {data?.pages.map(({ items, currentPage }) => (
                            <React.Fragment key={currentPage}>
                                {items?.length
                                    ? items?.map((item) => (
                                        <li key={item}>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                value={item}
                                                onClick={handleClick}
                                                className="w-full justify-start"
                                            >
                                                <Check className={cn(
                                                    'mr-2 h-4 w-4',
                                                    selectedValue === item ? 'opacity-100' : 'opacity-0'
                                                )} />
                                                <span className="capitalize whitespace-nowrap text-xs font-semibold">{item}</span>
                                            </Button>
                                        </li>
                                    ))
                                    : <li className="w-40 text-xs text-center py-4">No results found...</li>}
                            </React.Fragment>
                        ))}

                        <li>
                            <InView
                                variants={{
                                    hidden: { opacity: 0, y: 100, filter: 'blur(4px)' },
                                    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
                                }}
                                viewOptions={{ margin: '0px 0px -20px 0px' }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <Loader2 ref={loaderRef} className='animate-spin m-auto' />
                            </InView>
                        </li>
                    </ul>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
}
