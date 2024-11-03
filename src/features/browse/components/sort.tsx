'use client'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { Thesis } from '@/lib/types'
import { PopoverClose } from '@radix-ui/react-popover'
import { useQuery } from '@tanstack/react-query'
import { Table } from '@tanstack/react-table'
import { CheckIcon, ChevronsUpDown } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { SORTVALUES } from '../lib/constants'

export default function SortOptions() {
    const searchParams = useSearchParams()
    const defaultLabel = SORTVALUES.find(item => item.id === searchParams.get('sort'))?.label;

    const { data: table, isFetching } = useQuery<Table<Thesis>>({ queryKey: ['thesesTable'] });

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const id = e.currentTarget.value;
        const columnSort = SORTVALUES.find(item => item.id === id)?.value;
        columnSort && table?.getColumn(columnSort.id)?.toggleSorting(columnSort.desc);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline' size='sm' className='text-xs capitalize'>
                    Sort by: {defaultLabel}
                    <ChevronsUpDown size='1rem' className='ml-2' />
                </Button>
            </PopoverTrigger>
            <PopoverContent align='start' className='p-1 w-fit sm:p-2 sm:w-52 z-10'>
                <h3 className='sr-only'>Select a sort option</h3>
                <ul>
                    {SORTVALUES.map(({ label, id, }) => (
                        <li key={id}>
                            {isFetching
                                ? (<Skeleton className='h-10 w-full border' />)
                                : (
                                    <PopoverClose asChild>
                                        <Button
                                            value={id}
                                            variant='ghost'
                                            onClick={handleClick}
                                            className='justify-start w-full text-xs'
                                        >
                                            <CheckIcon
                                                aria-hidden='true'
                                                size='1rem'
                                                data-selected={label === defaultLabel}
                                                className='mr-2 opacity-0 data-[selected=true]:opacity-100'
                                            />
                                            {label}
                                        </Button>
                                    </PopoverClose>
                                )
                            }
                        </li>
                    ))}
                </ul>
            </PopoverContent>
        </Popover>
    )
}