import {
    createParser,
    useQueryState
} from 'nuqs';
import { getSortValue, getSorting } from '../helpers';


export default function useSortState() {
    const defaultState = getSorting('latest');
    const parseAsSortState = createParser({
        parse(query) {
            return getSorting(query);
        },
        serialize(value) {
            return getSortValue(value)?.id ?? 'latest';
        },
    });
    return useQueryState('sort', parseAsSortState.withDefault(defaultState));
}