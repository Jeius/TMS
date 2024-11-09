'use client'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Thesis } from '@/lib/types'
import { PopoverClose } from '@radix-ui/react-popover'
import { useQuery } from '@tanstack/react-query'
import { Table } from '@tanstack/react-table'
import { CheckIcon, ChevronsUpDown } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useState } from 'react'
import { SORT_VALUES } from '../lib/constants'

export default function SortOptions() {
    const { data: table, isFetching } = useQuery<Table<Thesis>>({ queryKey: ['thesesTable'] });
    const [sortId] = useQueryState('sort');
    const defaultLabel = SORT_VALUES.find(item => item.id === sortId)?.label;
    const [selectedLabel, setSelectedLabel] = useState(defaultLabel);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const id = e.currentTarget.value;
        const sortValue = SORT_VALUES.find(item => item.id === id);
        setSelectedLabel(prev => sortValue?.label ?? prev);

        const columnSort = sortValue?.value;
        if (columnSort) table?.getColumn(columnSort.id)?.toggleSorting(columnSort.desc);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline' size='sm' className='text-xs capitalize'>
                    Sort by: {selectedLabel ?? defaultLabel}
                    <ChevronsUpDown size='1rem' className='ml-2' />
                </Button>
            </PopoverTrigger>
            <PopoverContent align='start' className='p-1 w-fit sm:p-2 sm:w-52 z-10'>
                <h3 className='sr-only'>Select a sort option</h3>
                <ul>
                    {SORT_VALUES.map(({ label, id, }) => (
                        <li key={id}>
                            {
                                <PopoverClose asChild>
                                    <Button
                                        value={id}
                                        variant='ghost'
                                        onClick={handleClick}
                                        disabled={isFetching}
                                        className='justify-start w-full text-xs'
                                    >
                                        <CheckIcon
                                            aria-hidden='true'
                                            data-selected={label === (selectedLabel ?? defaultLabel)}
                                            className='opacity-0 data-[selected=true]:opacity-100'
                                        />
                                        {label}
                                    </Button>
                                </PopoverClose>
                            }
                        </li>
                    ))}
                </ul>
            </PopoverContent>
        </Popover>
    )
}