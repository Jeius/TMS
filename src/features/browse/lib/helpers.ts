import { ColumnFiltersState } from '@tanstack/react-table';

export function getFiltersState(initialFilterValues: [string, string][]): ColumnFiltersState {
    return initialFilterValues.map(([id, value]) => ({ id, value }));
}

