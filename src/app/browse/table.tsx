"use client"

import React from 'react'
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
import { Button } from '@/components/ui/button'
import { FileStackIcon, Plus } from 'lucide-react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { debounce } from 'lodash';
import { AnimatePresence, useAnimate } from 'framer-motion'

const TableOptions = dynamic(() => import('@/app/browse/table-options')) as React.ComponentType<TableOptionsProps<Thesis>>

type TableProps = React.HtmlHTMLAttributes<HTMLElement> & { data: Thesis[] }

type ScrollState = {
    left: { value?: number, isScrolled?: boolean },
    top: { value?: number, isScrolled?: boolean }
}

export default function BrowseTable({ data, ...props }: TableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({ author: false, year: false, department: false, dateUploaded: false });
    const [scrollState, setScrollState] = React.useState<ScrollState>({ left: {}, top: {} });
    const [width, childRef] = useDynamicWidth();
    const [scope, animate] = useAnimate();

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

    const handleScrollLeft = debounce((e: Event) => {
        const scrollLeft = (e.target as HTMLDivElement).scrollLeft;
        scrollLeft !== scrollState.left.value && setScrollState(prevState => ({
            ...prevState,
            left: { value: scrollLeft, isScrolled: scrollLeft > 0 }
        }));
    });

    const handleScrollDown = debounce(() => {
        const currentRect = childRef.current?.getBoundingClientRect();
        const headerRect = document.getElementById("app-header")?.getBoundingClientRect();

        if (currentRect && headerRect) {
            const scrollTop = Math.max(0, headerRect.height - currentRect.top);
            animate("thead", {
                y: scrollTop,
                boxShadow: scrollTop > 0 ? "0 0 6px rgba(0, 0, 0, 0.15)" : undefined,
            }, {
                duration: 0.05,
                damping: 80
            });
        }
    });

    // Set up event listeners for scrolling
    React.useEffect(() => {
        animate([["td"], ["th"]], { x: [60, 0], opacity: [0, 1] }, { damping: 80 });

        // Add event listeners
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
    }, [])

    return (
        <TooltipProvider>
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
                        className="m-auto max-w-fit scroll-smooth whitespace-nowrap bg-card shadow border"
                    >
                        <div className="flex flex-1 text-sm">
                            <AnimatePresence>
                                <Table ref={scope} className="relative w-min h-full table-fixed sm:static whitespace-normal border-separate border-spacing-0">
                                    <TableHeader
                                        className="sticky top-0 z-10 text-xs hover:bg-transparent"
                                    >
                                        {table.getHeaderGroups().map((headerGroup) => (
                                            <TableRow key={headerGroup.id} className="align-top border-0 hover:bg-transparent">
                                                {headerGroup.headers.map((header) => {
                                                    const isFirstColumn = header.id === 'title'
                                                    return (
                                                        <TableHead
                                                            key={header.id}
                                                            scope="col"
                                                            data-scroll-state={scrollState.left.isScrolled && "scrolled"}
                                                            className={`left-0 px-4 bg-muted border-b bg-gradient-to-b from-white/75 dark:bg-gradient-to-t dark:from-black/45 ${isFirstColumn ? "md:sticky z-[1] data-[scroll-state=scrolled]:md:shadow-right" : ""}`}
                                                            style={{
                                                                width: header.column.getSize(),
                                                                borderTop: scrollState.top.isScrolled ? "1px solid hsl(var(--border))" : "",
                                                            }}
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
                                                                data-scroll-state={scrollState.left.isScrolled && "scrolled"}
                                                                className={`left-0 align-top border-b p-4 overflow-hidden bg-card data-[state=selected]:bg-accent transition-colors ${isFirstColumn ? "md:sticky z-[1] data-[scroll-state=scrolled]:md:shadow-right" : ""}`}
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
                            </AnimatePresence>
                            <div className="block lg:mr-24 p-2 sm:w-full sm:max-w-xs min-w-[215px] lg:min-w-[288px] border-l">
                                <div className="py-3 px-4 font-semibold">
                                    <span>Add Columns</span>
                                </div>
                                {table
                                    .getAllColumns()
                                    .filter(
                                        (column) =>
                                            typeof column.accessorFn !== "undefined" && column.getCanHide() && !column.getIsVisible()
                                    )
                                    .map((column) => {
                                        return (
                                            <Button
                                                key={column.id}
                                                variant="ghost"
                                                size="sm"
                                                className="flex items-center space-x-2 capitalize w-full"
                                                onClick={() => { column.toggleVisibility(true) }}
                                            >
                                                <Plus aria-hidden="true" focusable="false" size={16} />
                                                <span className="line-clamp-2 w-full overflow-hidden text-left text-ellipsis">
                                                    {column.id.replace(/([a-z])([A-Z])/g, '$1 $2')}
                                                </span>
                                            </Button>
                                        )
                                    })}
                            </div>
                        </div>
                        <ScrollBar orientation="horizontal" className="z-10" />
                    </ScrollArea>
                </div>

                <div
                    className="mx-auto w-full rounded-b-xl border border-t-0 px-5 py-3 bg-card shadow"
                    style={{ maxWidth: width }}
                >
                    <Button size="lg"
                        variant="gradient"
                        className="p-2 sm:p-4 mx-auto flex space-x-2 font-sans font-bold"
                    >
                        <FileStackIcon aria-hidden="true" focusable="false" />
                        <span>Load more theses</span>
                    </Button>
                </div>
            </div>
        </TooltipProvider>
    )
}
