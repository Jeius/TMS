import { ColumnFiltersState } from '@tanstack/react-table';
import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import { useEffect, useState } from 'react';

type FilterParsers = {
    college?: string,
    department?: string,
    year?: number,
    adviser?: string,
    authors?: string[],
    panelists?: string[]
    specializations?: string[]
}

const filterParsers = {
    college: parseAsString,
    department: parseAsString,
    year: parseAsInteger,
    authors: parseAsArrayOf(parseAsString, ','),
    specializations: parseAsArrayOf(parseAsString, ','),
    adviser: parseAsString,
    panelists: parseAsArrayOf(parseAsString, ','),
}

const filterUrlKeys = {
    college: 'college',
    department: 'dept',
    year: 'year',
    authors: 'authors',
    specializations: 'sp',
    adviser: 'adviser',
    panelists: 'panelists',
}

type SetFilterStateParam = ColumnFiltersState | undefined;

export default function useFilterState() {
    const [filters, setFilters] = useQueryStates(filterParsers, { urlKeys: filterUrlKeys });

    const initColFiltersState: ColumnFiltersState = [];

    Object.entries(filters).forEach(([id, value]) => {
        if (value instanceof Array) {
            value.forEach(v => initColFiltersState.push({ id, value: v }));
        } else {
            initColFiltersState.push({ id, value });
        }
    });

    const [colFiltersState, setColFiltersState] = useState(initColFiltersState);

    function setFilterState(state: ColumnFiltersState) {
        const newFilters: FilterParsers = {};
        state.forEach(({ id, value }) => {
            switch (id) {
                case 'authors':
                    if (newFilters.authors) {
                        newFilters.authors.push(value as string)
                    } else {
                        newFilters.authors = [value as string]
                    }
                    break;
                case 'panelists':
                    if (newFilters.panelists) {
                        newFilters.panelists.push(value as string)
                    } else {
                        newFilters.panelists = [value as string]
                    }
                    break;
                case 'specializations':
                    if (newFilters.specializations) {
                        newFilters.specializations.push(value as string)
                    } else {
                        newFilters.specializations = [value as string]
                    }
                    break;
                case 'year':
                    newFilters.year = value as number;
                    break;
                case 'college':
                    newFilters.college = value as string;
                    break;
                case 'department':
                    newFilters.department = value as string;
                    break;
                case 'adviser':
                    newFilters.adviser = value as string;
                    break;
                default:
                    break;
            }
        })

        setFilters(newFilters);
    }

    useEffect(() => {
        setColFiltersState(colFiltersState);
    }, [colFiltersState]);

    return [colFiltersState, setColFiltersState] as const;
}
