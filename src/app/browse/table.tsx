"use client"

import React from 'react'
import { Thesis, columns } from './table-columns'
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
import { useDynamicWidth } from '@/hooks/use-dynamic-width'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

type TableProps = React.HtmlHTMLAttributes<HTMLElement> & { data: Thesis[] }

export default function BrowseTable({ data, ...props }: TableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [isScrolled, setIsScrolled] = React.useState(false)
    const scrollAreaRef = React.useRef<HTMLDivElement>(null)
    const [width, childRef] = useDynamicWidth()

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

        const scrollArea = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLDivElement
        if (scrollArea) {
            scrollArea.addEventListener('scroll', handleScroll)
        }

        return () => {
            if (scrollArea) {
                scrollArea.removeEventListener('scroll', handleScroll)
            }
        }
    }, [])

    return (
        <div {...props}>
            <div className="m-auto max-w-full overflow-hidden bg-card text-card-foreground border border-b-0 rounded-t-xl shadow" style={{ width }}>
                <TableOptions table={table} />
            </div>
            <div className="relative">
                <ScrollArea ref={scrollAreaRef} className="m-auto max-w-fit overflow-x-auto scroll-smooth whitespace-nowrap shadow border border-t-0">
                    <div ref={childRef} className="flex flex-1 text-sm">
                        <Table className="relative w-min h-full table-fixed sm:static whitespace-normal box-border">
                            <TableHeader className=" hover:bg-transparent z-10 text-xs">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id} className="border-t sticky top-0 align-top hover:bg-transparent">
                                        {headerGroup.headers.map((header) => {
                                            const isFirstColumn = header.id === 'title'
                                            return (
                                                <TableHead
                                                    key={header.id}
                                                    className={`p-0 bg-gradient-to-t dark:bg-gradient-to-b from-muted to-background ${isFirstColumn ? `sticky left-0 z-[1] ${isScrolled ? 'shadow-right' : ''}` : 'border-r last:border-r-0'}`}
                                                    style={{ width: `${header.getSize().toString()}px` }}
                                                >
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
                                            className="align-top hover:bg-transparent"
                                        >
                                            {row.getVisibleCells().map((cell) => {
                                                const isFirstColumn = cell.column.id === 'title'
                                                return (
                                                    <TableCell
                                                        key={cell.id}
                                                        className={`relative overflow-auto p-0 bg-card ${isFirstColumn ? `sticky left-0 z-[1] ${isScrolled ? 'shadow-right' : ''}` : 'border-r last:border-r-0'}`}
                                                        style={{ width: `${cell.column.getSize().toString()}px` }}
                                                    >
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
                    <ScrollBar orientation="horizontal" className="z-10" />
                </ScrollArea>
            </div>
        </div>
    )
}
