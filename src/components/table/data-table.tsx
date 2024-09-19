"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { DataTablePagination } from "./pagination"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./column-toggle"

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

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    classname?: string
    showSelected?: boolean
    showRowsPerPage?: boolean
    showFilter?: boolean
    showVisibilityToogle?: boolean
}

export function DataTable<TData, TValue>({
    columns,
    data,
    classname,
    showSelected = true,
    showRowsPerPage = true,
    showFilter = false,
    showVisibilityToogle = false,
}: DataTableProps<TData, TValue>) {
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
        <div>
            <div className="flex flex-row items-center">
                {showFilter &&
                    <div className="flex items-center py-4">
                        <Input
                            placeholder="Filter by keywords..."
                            value={(table.getColumn("specialization")?.getFilterValue() as string[]) ?? ""}
                            onChange={(event) =>
                                table.getColumn("specialization")?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm"
                        />
                    </div>}
                {showVisibilityToogle && <DataTableViewOptions table={table} />}
            </div>
            <ScrollArea className={cn("rounded-md border mx-auto mb-3 w-full", classname)}>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
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
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
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
                <ScrollBar orientation="horizontal" />
            </ScrollArea >
            <DataTablePagination
                showSelected={showSelected}
                showRowsPerPage={showRowsPerPage}
                table={table} />
        </div>
    )
}
