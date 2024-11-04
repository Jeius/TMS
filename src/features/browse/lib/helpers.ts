import { Thesis } from '@/lib/types';
import { ColumnDef, ColumnFiltersState, VisibilityState } from '@tanstack/table-core';

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

import { SortingState } from '@tanstack/table-core';
import { SORTVALUES } from './constants';

export const getSorting = (initialSortValue: string | null): SortingState => {
    if (initialSortValue) {
        const columnSort = SORTVALUES.find(item => item.id === initialSortValue)?.value;
        return columnSort ? [columnSort] : [];
    }
    return [];
};
