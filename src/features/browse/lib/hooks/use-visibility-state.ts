import { ColumnDef, VisibilityState } from '@tanstack/react-table';
import {
    createParser,
    parseAsArrayOf,
    parseAsString,
    useQueryState
} from 'nuqs';


function getVisibilityState<TData>(cols: ColumnDef<TData>[], visibleCols: string[]): VisibilityState {
    const visibility: VisibilityState = {};
    cols.forEach(col => {
        if (col.id !== 'theses') {
            visibility[col.id as string] = visibleCols.includes(col.id as string);
        }
    });
    return visibility;
}

export default function useVisibilityState<TData>(columns: ColumnDef<TData>[]) {
    const defaultState = getVisibilityState(columns, ['specializations', 'adviser']);
    const parseAsVisibilityState = createParser({
        parse: query => {
            const visibleCols = parseAsArrayOf(parseAsString).parse(query);
            return visibleCols === null ? null : getVisibilityState(columns, visibleCols);
        },
        serialize: value => {
            const visibleCols = Object.entries(value).filter(entry => entry[1]).map(entry => entry[0]);
            return parseAsArrayOf(parseAsString).serialize(visibleCols);
        },
    });
    return useQueryState('cols', parseAsVisibilityState.withDefault(defaultState));
}