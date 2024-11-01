'use client'

import Filters from '@/components/filters'
import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import ThesesTableContent from '@/features/browse/components/table-content'
import { Thesis } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table'
import { motion } from 'framer-motion'
import { BookCopyIcon } from 'lucide-react'
import React, { Suspense } from 'react'
import { VisibilityMenu } from './column-visibility'
import SortOptions from './sort'
import { columns } from './table-columns'

type TableProps = React.HtmlHTMLAttributes<HTMLDivElement> & { data: Thesis[] }

export default function ThesesTable({ data, className, ...props }: TableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({ author: false, year: false, department: false, dateUploaded: false });
    const { data: width = 'auto' } = useQuery<string>({ queryKey: ['tableWidth'] });

    // React Table instance setup
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        state: { sorting, columnFilters, columnVisibility },
    })

    return (
        <TooltipProvider>
            <div id="theses-table" className={cn('relative', className)} {...props}>
                <div className="flex flex-col m-auto bg-card shadow border rounded-xl max-w-fit overflow-hidden">
                    <div style={{ maxWidth: width }}
                        className='overflow-hidden p-4 gap-14 flex justify-between flex-col xs:flex-row items-center xs:items-end'
                    >
                        <Suspense><Filters /></Suspense>
                        <motion.div layout
                            transition={{ type: 'tween' }}
                            className='flex justify-between w-full xs:w-fit xs:justify-end items-center gap-2 flex-wrap'
                        >
                            <SortOptions table={table} />
                            <VisibilityMenu table={table} />
                        </motion.div>
                    </div>

                    <ThesesTableContent table={table} />

                    <div style={{ maxWidth: width }}
                        className="flex w-full max-w-full overflow-hidden border-t p-4 text-card-foreground"
                    >
                        <Button className="mx-auto font-bold flex-wrap h-auto min-h-10">
                            <BookCopyIcon aria-hidden="true" size='1.5rem' className='mr-2' />
                            Load more theses
                        </Button>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    )
}
