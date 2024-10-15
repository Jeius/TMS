"use client"

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Thesis, columns } from './table-columns'
import { useDynamicWidth } from '@/hooks/use-dynamic-width'
import { TableOptionsProps } from '@/app/browse/table-options'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import {
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


const TableOptions = dynamic(() => import('@/app/browse/table-options')) as React.ComponentType<TableOptionsProps<Thesis>>

type TableProps = React.HtmlHTMLAttributes<HTMLElement> & { data: Thesis[] }

type ScrollProps = { value?: number, isScrolled: boolean }

export default function BrowseTable({ data, ...props }: TableProps) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({ author: false, year: false, department: false, dateUploaded: false })
    const [scrollLeft, setScrollLeft] = useState<ScrollProps>({ isScrolled: false })
    const [scrollTop, setScrollTop] = useState<ScrollProps>({ isScrolled: false })
    const [width, childRef] = useDynamicWidth()

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

    // Handle horizontal scroll for left-sticky column
    const handleScrollLeft = (e: Event) => {
        const scrollLeft = (e.target as HTMLDivElement).scrollLeft
        setScrollLeft((prev) => ({ ...prev, isScrolled: scrollLeft > 0 }))
    }

    // Handle vertical scroll for header transformation
    const handleScrollDown = () => {
        const currentRect = childRef.current?.getBoundingClientRect()
        const headerRect = document.getElementById("app-header")?.getBoundingClientRect()

        if (currentRect && headerRect) {
            const offset = Math.max(0, headerRect.height - currentRect.top)
            setScrollTop(prev => ({ ...prev, value: offset, isScrolled: offset > 0 }))
        }
    }

    // Set up event listeners for scrolling
    useEffect(() => {
        window.addEventListener('scroll', handleScrollDown)

        const scrollArea = childRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLDivElement
        if (scrollArea) {
            scrollArea.addEventListener('scroll', handleScrollLeft)
        }

        return () => {
            if (scrollArea) {
                scrollArea.removeEventListener('scroll', handleScrollLeft)
            }
            window.removeEventListener('scroll', handleScrollDown)
        }
    }, [childRef])

    return (
        <div {...props}>
            {/* Table options and filters */}
            <div
                className="m-auto max-w-full overflow-hidden bg-card text-card-foreground border border-b-0 rounded-t-xl shadow"
                style={{ width }}
            >
                <TableOptions table={table} />
            </div>

            {/* Scrollable table area */}
            <div className="relative">
                <ScrollArea
                    ref={childRef}
                    className="text-sm m-auto max-w-fit scroll-smooth whitespace-nowrap shadow border border-t-0"
                >
                    <Table className="relative w-min h-full table-fixed sm:static whitespace-normal border-separate border-spacing-0">
                        <TableHeader
                            className="sticky top-0 z-10 text-xs hover:bg-transparent transition-transform ease-out"
                            style={scrollTop.isScrolled ? {
                                transform: `translate3d(0px, ${scrollTop.value}px, 0px)`,
                                boxShadow: "0 0 6px rgba(0, 0, 0, 0.15)",
                            } : undefined}
                        >
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className="align-top border-0 hover:bg-transparent">
                                    {headerGroup.headers.map((header) => {
                                        const isFirstColumn = header.id === 'title'
                                        return (
                                            <TableHead
                                                key={header.id}
                                                scope="col"
                                                data-scroll-state={scrollLeft.isScrolled && "scrolled"}
                                                className={`px-4 bg-muted border-y bg-gradient-to-b from-white/75 dark:bg-gradient-to-t dark:from-black/45 ${isFirstColumn ? "sticky left-0 z-[1] data-[scroll-state=scrolled]:shadow-right" : ""}`}
                                                style={{ width: `${header.getSize()}px` }}
                                            >
                                                {!header.isPlaceholder &&
                                                    flexRender(header.column.columnDef.header, header.getContext())
                                                }
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} className="align-top hover:bg-transparent">
                                        {row.getVisibleCells().map((cell) => {
                                            const isFirstColumn = cell.column.id === 'title'
                                            return (
                                                <TableCell
                                                    key={cell.id}
                                                    scope="col"
                                                    data-column-id={cell.column.id}
                                                    data-state={row.getIsSelected() && "selected"}
                                                    data-scroll-state={scrollLeft.isScrolled && "scrolled"}
                                                    className={`left-0 align-top border-b p-4 overflow-auto bg-card data-[state=selected]:bg-primary/40 transition-colors ${isFirstColumn ? "md:sticky z-[1] data-[scroll-state=scrolled]:shadow-right" : ""}`}
                                                    style={{ width: `${cell.column.getSize()}px` }}
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
                    <ScrollBar orientation="horizontal" className="z-10" />
                </ScrollArea>
            </div>
        </div>
    )
}
