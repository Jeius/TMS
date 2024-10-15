"use client"

import React from 'react'
import { Thesis, columns } from './table-columns'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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
import { useDynamicWidth } from '@/hooks/use-dynamic-width'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import dynamic from 'next/dynamic'
import { TableOptionsProps } from '@/app/browse/table-options'

const TableOptions = dynamic(() => import('@/app/browse/table-options')) as React.ComponentType<TableOptionsProps<Thesis>>

type TableProps = React.HtmlHTMLAttributes<HTMLElement> & { data: Thesis[] }

export default function BrowseTable({ data, ...props }: TableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [isScrolledLeft, setIsScrolledLeft] = React.useState(false)
    const [scrollTop, setScrollTop] = React.useState<{ value?: number, offset?: number, isScrolled: boolean }>({ isScrolled: false })
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
        const handleScrollLeft = (e: Event) => {
            const scrollLeft = (e.target as HTMLDivElement).scrollLeft
            setIsScrolledLeft(scrollLeft > 0)
        }

        const handleScrollDown = (e: Event) => {
            const currentRect = childRef.current?.getBoundingClientRect();
            const headerRect = document.getElementById("app-header")?.getBoundingClientRect();

            if (currentRect && headerRect) {
                // if (window.scrollY === 0) {
                //     setScrollTop((prev) => ({
                //         ...prev,
                //         offset: currentRect.top - headerRect.height,
                //     }));
                // }

                setScrollTop((prev) => {
                    const scrollValue = window.scrollY + headerRect.height - (currentRect.top > 0 ? currentRect.top : 0)
                    console.log("ScrollValue: ", scrollValue)
                    return {
                        ...prev,
                        value: scrollValue > 0 ? scrollValue : 0,
                        isScrolled: scrollValue > 0,
                    };
                });

                // Debugging output
                console.log(`Position: `, currentRect.top);
                console.log(`HeaderHeight: `, headerRect.height);
                console.log(`WindowScrollY: `, window.scrollY);
            }
        };


        const scrollArea = childRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLDivElement
        if (scrollArea) {
            scrollArea.addEventListener('scroll', handleScrollLeft)
        }

        window.addEventListener('scroll', handleScrollDown);

        return () => {
            if (scrollArea) {
                scrollArea.removeEventListener('scroll', handleScrollLeft)
            }
            window.removeEventListener('scroll', handleScrollDown);
        }
    }, [])

    return (
        <div {...props}>
            <div style={{ width }}
                className="m-auto max-w-full overflow-hidden bg-card text-card-foreground border border-b-0 rounded-t-xl shadow"
            >
                <TableOptions table={table} />
            </div>
            <div className="relative">
                <ScrollArea ref={childRef}
                    className="text-sm m-auto max-w-fit scroll-smooth whitespace-nowrap shadow border border-t-0"
                >
                    <Table className="relative w-min h-full table-fixed sm:static whitespace-normal border-separate border-spacing-0">
                        <TableHeader
                            className="sticky top-0 z-10 text-xs hover:bg-transparent transition-transform ease-out"
                            style={scrollTop.isScrolled ?
                                {
                                    transform: `translate3d(0px, ${scrollTop.value}px, 40px)`,
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
                                                data-scroll-state={isScrolledLeft && "scrolled"}
                                                className={`px-4 bg-muted border-y bg-gradient-to-b from-white/75 dark:bg-gradient-to-t dark:from-black/45 ${isFirstColumn ? "sticky left-0 z-[1] data-[scroll-state=scrolled]:shadow-right" : ""}`}
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
                                        className="align-top hover:bg-transparent"
                                    >
                                        {row.getVisibleCells().map((cell) => {
                                            const isFirstColumn = cell.column.id === 'title'
                                            return (
                                                <TableCell
                                                    key={cell.id}
                                                    scope="col"
                                                    data-column-id={cell.column.id}
                                                    data-state={row.getIsSelected() && "selected"}
                                                    data-scroll-state={isScrolledLeft && "scrolled"}
                                                    className={`left-0 align-top border-b p-4 overflow-auto bg-card data-[state=selected]:bg-primary/40 transition-colors ${isFirstColumn ? "md:sticky z-[1] data-[scroll-state=scrolled]:shadow-right" : ""}`}
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
                    <ScrollBar orientation="horizontal" className="z-10" />
                </ScrollArea>
            </div>
        </div>
    )
}
