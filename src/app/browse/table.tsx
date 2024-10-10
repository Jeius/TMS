"use client"

import React from 'react'
import { Thesis, columns } from './table-columns'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Table } from '@/components/ui/table'

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"
import TableHeader from './table-header'

type TableProps = React.HtmlHTMLAttributes<HTMLElement> & { data: Thesis[] }

export default function BrowseTable({ data, ...props }: TableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    })

    return (
        <Card {...props}>
            <CardHeader className="m-auto max-w-full overflow-hidden w-[1364px] p-0">
                <TableHeader table={table} />
            </CardHeader>
            <CardContent className="relative p-0">
                <div className="m-auto flex max-w-fit flex-1 overflow-auto scroll-smooth whitespace-nowrap text-sm">
                    <Table className="relative h-full w-min table-fixed border-separate border-spacing-0 whitespace-normal sm:static">

                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}