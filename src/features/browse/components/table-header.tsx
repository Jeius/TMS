import Filters from '@/components/filters'
import { SelectMenu, SelectMenuItem } from '@/components/select-menu'
import { VisibilityMenu } from '@/features/browse/components/column-visibility'
import { cn } from '@/lib/utils'
import { Table } from '@tanstack/react-table'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const SortOptions = <TData,>({ table }: { table: Table<TData> }) => {
    const sortItems: SelectMenuItem[] = [
        { label: 'Latest First', value: 'latest' },
        { label: 'Oldest First', value: 'old' },
        { label: 'A - Z', value: 'alpha' },
        { label: 'Z - A', value: '-alpha' },
    ];

    const router = useRouter()
    const searchParams = useSearchParams()
    const defaultValue = sortItems?.find(item => item.value === searchParams.get('sort'))?.value;

    const handleSortChange = (sortItem: string) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set('sort', sortItem);
        router.push(`?${currentParams.toString()}`);

        if (sortItem === 'alpha') {
            table.getColumn('title')?.toggleSorting(false); // Ascending
        } else if (sortItem === '-alpha') {
            table.getColumn('title')?.toggleSorting(true); // Descending
        } else if (sortItem === 'latest') {
            table.getColumn('year')?.toggleSorting(true); // Descending (latest first)
        } else if (sortItem === 'old') {
            table.getColumn('year')?.toggleSorting(false); // Ascending (oldest first)
        }
    };

    return (
        <SelectMenu items={sortItems} defaultValue={defaultValue} title="Sort by:" placeholder="Sort by:" onValueChanged={handleSortChange} />
    )
}

export type TableOptionsProps<TData> = React.HTMLAttributes<HTMLDivElement> & {
    table: Table<TData>
}

export default function TableHeader<TData>({
    table, className, ...props
}: TableOptionsProps<TData>) {
    return (
        <div className={cn('w-full max-w-full overflow-hidden text-card-foreground', className)} {...props}>
            <div className="overflow-hidden px-4 py-3 flex flex-col items-center space-y-10 xs:space-y-0 xs:flex-row xs:items-end sm:justify-between ">
                <div className="xs:mr-5 sm:mr-20 md:mr-32">
                    <Filters />
                </div>
                <motion.div layout transition={{ type: 'tween' }} className="flex justify-between w-full 2xs:w-auto 2xs:justify-end items-center gap-2 flex-wrap">
                    <motion.div layout transition={{ type: 'tween' }}><SortOptions table={table} /></motion.div>
                    <motion.div layout transition={{ type: 'tween' }}><VisibilityMenu table={table} /></motion.div>
                </motion.div>
            </div>
        </div>
    )
}

