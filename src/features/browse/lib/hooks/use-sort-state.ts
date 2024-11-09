import { SortingState } from '@tanstack/react-table';
import { isEqual } from 'lodash';
import {
    createParser,
    parseAsString,
    useQueryState
} from 'nuqs';
import { SORT_VALUES } from '../constants';

function getSorting(sortId: string): SortingState | null {
    const columnSort = SORT_VALUES.find(({ id }) => id === sortId)?.value;
    return columnSort ? [columnSort] : null;
}

export function getSortValue(sortState: SortingState) {
    const sortValue = SORT_VALUES.find(({ value: sortValue }) =>
        sortState.some(columnSort => isEqual(sortValue, columnSort)));
    return sortValue ?? null;
}

const parseAsSortState = createParser({
    parse: (query) => {
        const sortId = parseAsString.parse(query);
        return sortId === null ? null : getSorting(sortId);
    },
    serialize: (value) => {
        const sortId = getSortValue(value)?.id ?? 'latest';
        return parseAsString.serialize(sortId);
    },
});

export default function useSortState() {
    const defaultState = [{ id: 'year', desc: true }];

    return useQueryState('sort', parseAsSortState.withDefault(defaultState));
}