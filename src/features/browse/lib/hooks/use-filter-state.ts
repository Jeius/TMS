import { ColumnFiltersState } from '@tanstack/react-table';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import { useEffect, useState } from 'react';

export const filterParsers = {
  college: parseAsString,
  department: parseAsString,
  year: parseAsInteger,
  authors: parseAsString,
  specializations: parseAsString,
  adviser: parseAsString,
  panelists: parseAsString,
};

export const filterUrlKeys = {
  college: 'col',
  department: 'dept',
  year: 'yr',
  authors: 'aut',
  specializations: 'sp',
  adviser: 'adv',
  panelists: 'pnls',
};

export default function useFilterState() {
  const [filtersQuery, setFiltersQuery] = useQueryStates(filterParsers, {
    urlKeys: filterUrlKeys,
  });
  const defaultFilterState = Object.entries(filtersQuery)
    .filter((entry) => entry[1])
    .map(([id, value]) => ({ id, value }));
  const [filterState, setFilterState] =
    useState<ColumnFiltersState>(defaultFilterState);

  useEffect(() => {
    const newFiltersQuery: Record<string, unknown> = {
      college: null,
      department: null,
      year: null,
      authors: null,
      specializations: null,
      adviser: null,
      panelists: null,
    };
    filterState.forEach(({ id, value }) => (newFiltersQuery[id] = value));
    setFiltersQuery(newFiltersQuery);
  }, [filterState, setFiltersQuery]);

  return [filterState, setFilterState] as const;
}
