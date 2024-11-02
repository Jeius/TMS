'use client'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableHeader, TableRow, } from '@/components/ui/table'
import { AnimatedTableCell, AnimatedTableHead } from '@/features/browse/components/animated-table-elements'
import { ColumnVisibilityControl } from '@/features/browse/components/column-visibility'
import { Thesis } from '@/lib/types'
import { useQueryClient } from '@tanstack/react-query'
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState
} from '@tanstack/react-table'
import { useAnimate } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useResizeObserver, useScrollEvents } from '../lib/hooks'
import { createColumns, createMainColumn } from './table-columns'

type ThesesTableContentProps = {
    theses: Thesis[];
    columnIds: string[];
}

const initialHidden = { author: false, year: false, department: false, dateUploaded: false };
const initialScrollState = { left: { value: 0, isScrolled: false } };

export default function ThesesTableContent({ theses, columnIds }: ThesesTableContentProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const columns = useMemo(() => [createMainColumn(), ...createColumns(columnIds)], [columnIds]);

    const visibleColumns = useMemo(() => {
        const columnsParam = searchParams.get('cols');
        return columnsParam ? columnsParam.split(',') : [];
    }, [searchParams]);

    const initialColumns = useMemo(() => {
        const visibility: VisibilityState = {};
        columns.forEach(col => {
            if (col.id !== 'theses') visibility[col.id as string] = visibleColumns.includes(col.id as string);
        });
        return visibility;
    }, [visibleColumns]);

    const queryClient = useQueryClient();
    const [scope, animate] = useAnimate();
    const [scrollState, setScrollState] = useState(initialScrollState);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialColumns);

    const table = useReactTable({
        data: theses,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        initialState: { columnVisibility: initialHidden },
        state: { sorting, columnFilters, columnVisibility },
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

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        const visibleColumns = Object.entries(columnVisibility).filter(entry => entry[1]).map(entry => entry[0]);

        if (visibleColumns.length !== 0) {
            params.set('cols', visibleColumns.join(','));
        } else {
            params.delete('cols');
        }
        router.replace(`?${params.toString()}`);
    }, [searchParams, columnVisibility]);

    return (
        <ScrollArea
            ref={scope}
            className="scroll-smooth whitespace-nowrap max-w-fit"
        >
            <div className="flex flex-1 text-sm">
                <Table className="relative w-min h-full table-fixed sm:static whitespace-normal border-separate border-spacing-0">
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
                        <div className="block border-l border-y bg-card/80 z-10 lg:pr-20">
                            <ColumnVisibilityControl type='column' />
                        </div>
                    ) : (null)}
            </div>
            <ScrollBar orientation="horizontal" className="z-10" />
        </ScrollArea>
    );
}
