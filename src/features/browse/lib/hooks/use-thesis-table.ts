import { columns } from '@/features/browse/components/table-columns';
import useGlobalState from '@/lib/hooks/use-global-state';
import responsivePx from '@/lib/responsive-px';
import { Thesis } from '@/lib/types';
import { fetchTheses } from '@/server/actions';
import { useQuery } from '@tanstack/react-query';
import {
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';
import { useEffect } from 'react';
import useFilterState from './use-filter-state';
import useSortState from './use-sort-state';
import useVisibilityState from './use-visibility-state';

export default function useThesisTable() {
  const columnPinning = { left: ['theses'] };
  const columnOrder = useQueryState(
    'cols',
    parseAsArrayOf(parseAsString).withDefault(['specializations', 'adviser'])
  )[0];
  const columnSizing = { theses: responsivePx(420), year: responsivePx(120) };

  const [columnVisibility, setColumnVisibility] = useVisibilityState(columns);
  const [sorting, setSorting] = useSortState();
  const [columnFilters, setColumnFilters] = useFilterState();

  const { data: theses = [] } = useQuery({
    queryKey: ['theses'],
    queryFn: () => fetchTheses({}),
  });

  const table = useReactTable({
    data: theses as Thesis[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    columnResizeMode: 'onChange',
    initialState: {
      columnPinning,
      columnOrder,
      columnSizing,
    },
    state: {
      columnVisibility,
      sorting,
      columnFilters,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
  });

  // Use global state for persistent table configuration
  const [globalTableState, setGlobalTableState] = useGlobalState(
    'theses-table',
    table
  );

  // Sync local states with global state when they change
  useEffect(() => {
    setGlobalTableState(table);
  }, [table, columnVisibility, sorting, columnFilters, setGlobalTableState]);

  return globalTableState;
}
