'use client'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { PopoverClose } from '@radix-ui/react-popover'
import { Table } from '@tanstack/react-table'
import { CheckIcon, ChevronsUpDown } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

const sortItems = [
    { label: 'Latest First', value: 'latest' },
    { label: 'Oldest First', value: 'old' },
    { label: 'A - Z', value: 'alpha' },
    { label: 'Z - A', value: '-alpha' },
]

export default function SortOptions<TData>({ table }: { table: Table<TData> }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const defaultValue = sortItems?.find(item => item.value === searchParams.get('sort'))?.value

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const sortItem = e.currentTarget.value;
        const currentParams = new URLSearchParams(searchParams.toString())
        currentParams.set('sort', sortItem)
        router.push(`?${currentParams.toString()}`)

        if (sortItem === 'alpha') {
            table.getColumn('title')?.toggleSorting(false) // Ascending
        } else if (sortItem === '-alpha') {
            table.getColumn('title')?.toggleSorting(true) // Descending
        } else if (sortItem === 'latest') {
            table.getColumn('year')?.toggleSorting(true) // Descending (latest first)
        } else if (sortItem === 'old') {
            table.getColumn('year')?.toggleSorting(false) // Ascending (oldest first)
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline' size='sm' className='text-xs capitalize'>
                    Sort by: {sortItems.find(item => item.value === defaultValue)?.label}
                    <ChevronsUpDown size='1rem' className='ml-2' />
                </Button>
            </PopoverTrigger>
            <PopoverContent align='start' className='p-1 w-fit sm:p-2 sm:w-52 z-10'>
                <h3 className='sr-only'>Select a sort option</h3>
                <ul>
                    {sortItems.map(({ label, value }) => (
                        <li key={value}>
                            <PopoverClose asChild>
                                <Button
                                    variant='ghost'
                                    value={value} onClick={handleClick}
                                    className='justify-start w-full text-xs'
                                >
                                    <CheckIcon
                                        aria-hidden='true'
                                        size='1rem'
                                        data-selected={defaultValue === value}
                                        className='mr-2 opacity-0 data-[selected=true]:opacity-100'
                                    />
                                    {label}
                                </Button>
                            </PopoverClose>
                        </li>
                    ))}
                </ul>
            </PopoverContent>
        </Popover>
    )
}