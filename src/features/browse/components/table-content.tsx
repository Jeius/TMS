'use client'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableHeader, TableRow, } from '@/components/ui/table'
import { AnimatedTableCell, AnimatedTableHead } from '@/features/browse/components/animated-table-elements'
import { ColumnVisibilityControl } from '@/features/browse/components/column-visibility'
import { Thesis } from '@/lib/types'
import { fetchMockFilterIds } from '@/mock/actions/fetch-filters'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    Row,
    SortingState,
    useReactTable,
    VisibilityState
} from '@tanstack/react-table'
import { useAnimate } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { memo, useEffect, useMemo, useState } from 'react'
import { SORTVALUES } from '../lib/constants'
import { ScrollState, useResizeObserver, useScrollEvents } from '../lib/hooks'
import { createColumns, createMainColumn } from './table-columns'

type ThesesTableContentProps = {
    theses: Thesis[];
    columnIds: string[];
}

const initialScrollState = { left: { value: 0, isScrolled: false } };

export default function ThesesTableContent({ theses, columnIds }: ThesesTableContentProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const columns = useMemo(() => [createMainColumn(), ...createColumns(columnIds)], [columnIds]);
    const { data: filters = [] } = useQuery({ queryKey: ['filterIds'], queryFn: fetchMockFilterIds });

    const queryClient = useQueryClient();
    const [scope, animate] = useAnimate();
    const [scrollState, setScrollState] = useState(initialScrollState);

    const visibleColumIds = searchParams.get('cols')?.split(',') ?? [];
    const sortValueId = searchParams.get('sort');
    const filterValues = useMemo(() => Array.from(searchParams.entries()).filter(entry => filters.includes(entry[0])), [searchParams]);

    const columnVisibility = useMemo(() => {
        const visibility: VisibilityState = {};
        columns.forEach(col => {
            if (col.id !== 'theses') {
                visibility[col.id as string] = visibleColumIds.includes(col.id as string);
            }
        });
        return visibility;
    }, [visibleColumIds]);

    const sorting = useMemo((): SortingState => {
        if (sortValueId) {
            const columnSort = SORTVALUES.find(item => item.id === sortValueId)?.value
            return columnSort ? [columnSort] : []
        }
        return [];
    }, [sortValueId, SORTVALUES]);

    const columnFilters = useMemo((): ColumnFiltersState => {
        return filterValues.map(([id, value]) => ({ id: id, value: value }))
    }, [filterValues]);

    const table = useReactTable({
        data: theses,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        columnResizeMode: 'onChange',
        initialState: { sorting, columnFilters, columnVisibility, columnPinning: { left: ['theses'] } },
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
    })

    function updateWidth() {
        const width = scope.current ? `${scope.current.offsetWidth}px` : 'auto';
        queryClient.setQueryData(['tableWidth'], width);
    }

    useResizeObserver({ scopeRef: scope, updateWidth });
    useScrollEvents({ scopeRef: scope, setScrollState, animate });

    useEffect(() => {
        queryClient.setQueryData(['thesesTable'], table)
    }, [table]);


    const visibleColumns = table.getVisibleLeafColumns().map(col => col.id);
    const filterState = table.getState().columnFilters;
    const sortingState = table.getState().sorting;

    const sortId = useMemo(() =>
        SORTVALUES.find(({ value }) =>
            sortingState.some((columnSort) =>
                value.desc === columnSort.desc && value.id === columnSort.id
            )
        )?.id,
        [sortingState]
    );

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
            router.replace(`?${newSearch}`);
        }
    }, [visibleColumns, sortingState, filterState, sortId, router]);

    const columnSizeVars = useMemo(() => {
        const headers = table.getFlatHeaders()
        const colSizes: { [key: string]: number } = {}
        headers.forEach((header) => {
            colSizes[`--header-${header.id}-size`] = header.getSize();
            colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
        })
        return colSizes
    }, [table.getState().columnSizingInfo, table.getState().columnSizing])


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
                    <MemoizedTableBody rows={table.getRowModel().rows} columns={columns} scrollState={scrollState} />
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


const MemoizedTableBody = memo(function TableBodyContent({
    rows, columns, scrollState
}: { rows: Row<Thesis>[], columns: ColumnDef<Thesis>[], scrollState: ScrollState }) {
    return (
        <TableBody>
            {rows.length ? (
                rows.map((row) => (
                    <TableRow key={row.id} className="align-top hover:bg-transparent">
                        <AnimatedTableCell row={row} scrollState={scrollState} />
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
    );
});