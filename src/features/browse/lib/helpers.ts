import { Thesis } from '@/lib/types';
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from '@tanstack/react-table';
import { SORT_VALUES } from './constants';

export const getColumnVisibility = (columns: ColumnDef<Thesis>[], initialVisibleColumns: string[]): VisibilityState => {
    const visibility: VisibilityState = {};
    columns.forEach(col => {
        if (col.id !== 'theses') {
            visibility[col.id as string] = initialVisibleColumns.includes(col.id as string);
        }
    });
    return visibility;
};

export const getColumnFilters = (initialFilterValues: [string, string][]): ColumnFiltersState => {
    return initialFilterValues.map(([id, value]) => ({ id, value }));
};

export const getSorting = (initialSortValue: string | null): SortingState => {
    if (initialSortValue) {
        const columnSort = SORT_VALUES.find(item => item.id === initialSortValue)?.value;
        return columnSort ? [columnSort] : [];
    }
    return [];
};
