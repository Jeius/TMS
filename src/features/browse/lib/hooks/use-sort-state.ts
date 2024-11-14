import { SortingState } from '@tanstack/react-table';
import { isEqual } from 'lodash';
import {
    createParser,
    parseAsStringLiteral,
    useQueryState
} from 'nuqs';
import { SORT_VALUES } from '../constants';
import { SortId } from '../types';

const sortIds = ['latest', 'oldest', 'alpha', '-alpha'] as const

function getSorting(sortId: SortId): SortingState | null {
    const columnSort = SORT_VALUES.find(({ id }) => id === sortId)?.value;
    return columnSort ? [columnSort] : null;
}

export function getSortValue(sortState: SortingState) {
    const sortValue = SORT_VALUES.find(({ value: sortValue }) =>
        sortState.some(columnSort => isEqual(sortValue, columnSort)));
    return sortValue || null;
}

const parseAsSortState = createParser({
    parse: (query) => {
        console.log('parse query', query)
        const sortId = parseAsStringLiteral(sortIds).parse(query);
        return sortId === null ? null : getSorting(sortId);
    },
    serialize: (value) => {
        console.log('serialize value', value)
        const sortId = getSortValue(value)?.id ?? 'latest';
        return parseAsStringLiteral(sortIds).serialize(sortId);
    },
});

export default function useSortState() {
    const defaultState = [{ id: 'year', desc: true }];

    return useQueryState('sort', parseAsSortState.withDefault(defaultState));
}