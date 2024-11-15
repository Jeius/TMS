'use client'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableHeader, TableRow, } from '@/components/ui/table'
import { AnimatedTableCell, AnimatedTableHead } from '@/features/browse/components/animated-table-elements'
import { ColumnVisibilityControl } from '@/features/browse/components/column-visibility'
import responsivePx from '@/lib/responsive-px'
import { Thesis } from '@/lib/types'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
    getCoreRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table'
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'
import { useEffect, useMemo } from 'react'
import { fetchTheses } from '../lib/actions'
import useFilterState from '../lib/hooks/use-filter-state'
import { useScrollEvents } from '../lib/hooks/use-scroll-events'
import useSortState from '../lib/hooks/use-sort-state'
import { useStickyTHead } from '../lib/hooks/use-sticky-thead'
import useVisibilityState from '../lib/hooks/use-visibility-state'
import { columns } from './table-columns'


export default function ThesesTableContent() {
    const queryClient = useQueryClient();
    const scope = useStickyTHead('app-header');
    const scrollState = useScrollEvents('data-radix-scroll-area-viewport', scope);

    const { data: theses = [] } = useQuery({
        queryKey: ['theses'],
        queryFn: () => fetchTheses({ columns: columnVisibility }),
        refetchOnMount: false
    });

    const columnPinning = { left: ['theses'] };
    const columnOrder = useQueryState('cols', parseAsArrayOf(parseAsString).withDefault(['specializations', 'adviser']))[0];
    const columnSizing = { 'theses': responsivePx(420), 'year': responsivePx(120) };
    const [columnVisibility, setColumnVisibilty] = useVisibilityState(columns);
    const [sorting, setSorting] = useSortState()
    const [columnFilters, setColumnFilters] = useFilterState();


    const table = useReactTable({
        data: theses as Thesis[],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        columnResizeMode: 'onChange',
        initialState: { columnPinning, columnOrder, columnSizing },
        state: { columnVisibility, sorting },
        onColumnVisibilityChange: setColumnVisibilty,
        onSortingChange: setSorting,
    })

    const headers = table.getFlatHeaders();
    const colSizing = table.getState().columnSizing;

    const columnSizeVars = useMemo(() => {
        const colSizes: { [key: string]: number } = {};
        headers.forEach((header) => {
            colSizes[`--header-${header.id}-size`] = colSizing[header.id];
            colSizes[`--col-${header.column.id}-size`] = colSizing[header.id];
        })
        return colSizes;
    }, [headers, colSizing]);

    useEffect(() => {
        queryClient.setQueryData(['thesesTable'], table)
        console.log("Table changed", table.getState().sorting)
    }, [table, queryClient]);

    return (
        <ScrollArea
            ref={scope}
            className="scroll-smooth whitespace-nowrap max-w-fit"
        >
            <div className="flex text-sm">
                <Table
                    className="relative sm:static whitespace-normal border-separate border-spacing-0"
                    style={{
                        ...columnSizeVars,
                        width: table.getTotalSize()
                    }}
                >
                    <TableHeader className="sticky top-0 z-10 text-xs hover:bg-transparent">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="align-top border-0 hover:bg-transparent">
                                <AnimatedTableHead headers={headerGroup.headers} scrollState={scrollState} />
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length
                            ? (table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} className="align-top hover:bg-transparent">
                                    <AnimatedTableCell row={row} scrollState={scrollState} />
                                </TableRow>
                            )))
                            : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No records.
                                    </TableCell>
                                </TableRow>
                            )}
                    </TableBody>
                </Table>
                {table.getAllColumns().filter(column => column.getCanHide() && !column.getIsVisible()).length
                    ? (
                        <div className="block border-l border-y bg-card/80 z-10 pr-8 lg:pr-16">
                            <ColumnVisibilityControl type='column' />
                        </div>
                    ) : (null)}
            </div>
            <ScrollBar orientation="horizontal" className="z-10" />
        </ScrollArea>
    );
}
