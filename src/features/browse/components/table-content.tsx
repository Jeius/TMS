'use client'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableHeader, TableRow, } from '@/components/ui/table'
import { AnimatedTableCell, AnimatedTableHead } from '@/features/browse/components/animated-table-elements'
import { ColumnVisibilityControl } from '@/features/browse/components/column-visibility'
import { fetchMockFilterIds } from '@/mock/actions/fetch-filters'
import { fetchMockTheses } from '@/mock/actions/fetch-thesis-data'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
    getCoreRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table'
import { useAnimate } from 'framer-motion'
import { isEqual } from 'lodash'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { SORTVALUES } from '../lib/constants'
import { getColumnFilters, getColumnVisibility, getSorting } from '../lib/helpers'
import { useResizeObserver, useScrollEvents } from '../lib/hooks'
import { columns } from './table-columns'


const initialScrollState = { left: { value: 0, isScrolled: false } };

export default function ThesesTableContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const queryClient = useQueryClient();
    const [scope, animate] = useAnimate();
    const [scrollState, setScrollState] = useState(initialScrollState);

    const { data: filters = [] } = useQuery({ queryKey: ['filterIds'], queryFn: () => fetchMockFilterIds() });
    const { data: theses = [] } = useQuery({ queryKey: ['theses'], queryFn: () => fetchMockTheses(), refetchOnMount: true });

    const initialVisibleColumns = useMemo(() => searchParams.get('cols')?.split(',') ?? [], [searchParams]);
    const initialSortValue = searchParams.get('sort');
    const initialFilterValues = useMemo(() => Array.from(searchParams.entries()).filter(entry => filters.includes(entry[0])), [searchParams, filters]);

    const columnVisibility = useMemo(() => getColumnVisibility(columns, initialVisibleColumns), [initialVisibleColumns]);
    const sorting = useMemo(() => getSorting(initialSortValue), [initialSortValue]);
    const columnFilters = useMemo(() => getColumnFilters(initialFilterValues), [initialFilterValues]);
    const columnOrder = initialVisibleColumns;
    const columnPinning = { left: ['theses'] };

    const table = useReactTable({
        data: theses,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        columnResizeMode: 'onChange',
        initialState: { sorting, columnFilters, columnVisibility, columnOrder, columnPinning },
    })

    const headers = table.getFlatHeaders();

    const columnSizeVars = useMemo(() => {
        const colSizes: { [key: string]: number } = {};
        headers.forEach((header) => {
            colSizes[`--header-${header.id}-size`] = header.getSize();
            colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
        })
        return colSizes;
    }, [headers]);

    const visibleColumns = table.getVisibleLeafColumns().map(col => col.id);
    const filterState = table.getState().columnFilters;
    const sortingState = table.getState().sorting;

    const sortId = useMemo(() =>
        SORTVALUES.find(({ value }) =>
            sortingState.some(columnSort => isEqual(value, columnSort)))?.id
        , [sortingState]);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        // Update visible columns
        if (visibleColumns.length !== 0) params.set('cols', visibleColumns.join(','));
        else params.delete('cols');

        // Update filters
        filterState.forEach(({ id, value }) => params.set(id, value as string));

        // Update sorting
        if (sortId) params.set('sort', sortId);
        else params.delete('sort');

        const newSearch = params.toString();
        if (newSearch !== searchParams.toString()) {
            router.replace(`?${newSearch}`, { scroll: false });
        }
    }, [visibleColumns, sortingState, filterState, sortId, router, searchParams]);

    function updateWidth() {
        const width = scope.current ? `${scope.current.offsetWidth}px` : 'auto';
        queryClient.setQueryData(['tableWidth'], width);
    }

    useResizeObserver({ scopeRef: scope, updateWidth });

    useScrollEvents({ scopeRef: scope, setScrollState, animate });

    useEffect(() => {
        queryClient.setQueryData(['thesesTable'], table)
    }, [table, queryClient]);

    return (
        <ScrollArea
            ref={scope}
            className="scroll-smooth whitespace-nowrap max-w-fit"
        >
            <div className="flex flex-1 text-sm">
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
