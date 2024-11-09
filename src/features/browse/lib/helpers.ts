import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from '@tanstack/react-table';
import { isEqual } from 'lodash';
import { SORT_VALUES } from './constants';

export function getVisibilityState<TData>(cols: ColumnDef<TData>[], visibleCols: string[]): VisibilityState {
    const visibility: VisibilityState = {};
    cols.forEach(col => {
        if (col.id !== 'theses') {
            visibility[col.id as string] = visibleCols.includes(col.id as string);
        }
    });
    return visibility;
}

export function getFiltersState(initialFilterValues: [string, string][]): ColumnFiltersState {
    return initialFilterValues.map(([id, value]) => ({ id, value }));
}

export function getSorting(sortId: string | null): SortingState {
    if (sortId) {
        const columnSort = SORT_VALUES.find(({ id }) => id === sortId)?.value;
        return columnSort ? [columnSort] : [];
    }
    return [];
}

export function getSortValue(sortState: SortingState) {
    const sortValue = SORT_VALUES.find(({ value: sortValue }) =>
        sortState.some(columnSort => isEqual(sortValue, columnSort)));
    return sortValue;
}