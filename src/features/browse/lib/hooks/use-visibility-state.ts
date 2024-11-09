import { ColumnDef } from '@tanstack/react-table';
import {
    createParser,
    parseAsArrayOf,
    parseAsString,
    useQueryState
} from 'nuqs';
import { getVisibilityState } from '../helpers';


export default function useVisibilityState<TData>(columns: ColumnDef<TData>[]) {
    const defaultState = getVisibilityState(columns, []);
    const parseAsVisibilityState = createParser({
        parse(query) {
            const visibleCols = parseAsArrayOf(parseAsString, ',').parse(query);
            return getVisibilityState(columns, visibleCols ?? []);
        },
        serialize(value) {
            const visibleCols = Object.entries(value).filter(entry => entry[1]).map(entry => entry[0]);
            return visibleCols.toString();
        },
    });
    return useQueryState('cols', parseAsVisibilityState.withDefault(defaultState));
}