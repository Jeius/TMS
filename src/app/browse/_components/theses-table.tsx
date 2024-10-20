"use client"

import ThesesTableContent from '@/app/browse/_components/table-content'
import { TableOptionsProps } from '@/app/browse/_components/table-header'
import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Thesis } from "@/utils/types"
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
} from "@tanstack/react-table"
import { FileStackIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import React from 'react'
import { columns } from './table-columns'

const TableOptions = dynamic(() => import('@/app/browse/_components/table-header')) as React.ComponentType<TableOptionsProps<any>>

type TableProps = React.HtmlHTMLAttributes<HTMLDivElement> & { data: Thesis[] }

export default function ThesesTable({ data, className, ...props }: TableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({ author: false, year: false, department: false, dateUploaded: false });

    const { data: width = "auto" } = useQuery<string>({ queryKey: ["tableWidth"] })

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
            <div id="theses-table" className={cn("relative", className)} {...props}>
                <div className="flex flex-col m-auto bg-card shadow border rounded-xl max-w-fit overflow-hidden">
                    <TableOptions table={table} style={{ maxWidth: width }} />
                    <ThesesTableContent table={table} />
                    <div style={{ maxWidth: width }} className="w-full max-w-full overflow-hidden border-t-0 p-3 bg-card text-card-foreground">
                        <Button size="lg"
                            variant="gradient"
                            className="p-2 sm:p-4 mx-auto flex space-x-2 font-sans"
                        >
                            <FileStackIcon aria-hidden="true" focusable="false" />
                            <span className="font-bold">Load more theses</span>
                        </Button>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    )
}
