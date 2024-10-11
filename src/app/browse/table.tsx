"use client"

import React from 'react'
import { Thesis, columns } from './table-columns'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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
import TableOptions from './table-options'

type TableProps = React.HtmlHTMLAttributes<HTMLElement> & { data: Thesis[] }

export default function BrowseTable({ data, ...props }: TableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [isScrolled, setIsScrolled] = React.useState(false)

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

    React.useEffect(() => {
        const handleScroll = (e: Event) => {
            const scrollLeft = (e.target as HTMLDivElement).scrollLeft
            setIsScrolled(scrollLeft > 0)
        }

        const tableContainer = document.querySelector('.table-container')
        if (tableContainer) {
            tableContainer.addEventListener('scroll', handleScroll)
        }

        return () => {
            if (tableContainer) {
                tableContainer.removeEventListener('scroll', handleScroll)
            }
        }
    }, [])

    return (
        <Card {...props}>
            <CardHeader className="m-auto max-w-full overflow-hidden p-0">
                <TableOptions table={table} />
            </CardHeader>
            <CardContent className="relative p-0 border-y">
                <div className="table-container m-auto flex max-w-fit flex-1 overflow-auto scroll-smooth whitespace-nowrap text-sm">
                    <Table className="relative w-min h-full table-fixed sm:static whitespace-normal">
                        <TableHeader className="sticky top-0 z-10 text-xs">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        const isFirstColumn = header.id === 'title'
                                        return (
                                            <TableHead
                                                key={header.id}
                                                className={`relative bg-accent hover:bg-none border-x ${isFirstColumn ? `sticky left-0 z-[1] w-[514px] ${isScrolled ? 'shadow-lg' : ''}` : 'w-[250px]'}`}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className="hover:bg-transparent"
                                    >
                                        {row.getVisibleCells().map((cell) => {
                                            const isFirstColumn = cell.column.id === 'title'
                                            return (
                                                <TableCell
                                                    key={cell.id}
                                                    className={`relative bg-card border-x ${isFirstColumn ? `sticky left-0 z-[1] w-[514px] ${isScrolled ? 'shadow-lg border-r' : ''}` : 'w-[250px]'}`}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No records.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}
