'use client';

import { FILTERS } from '@/features/browse/lib/constants';
import {
  filterParsers,
  filterUrlKeys,
} from '@/features/browse/lib/hooks/use-filter-state';
import { ColumnID } from '@/features/browse/lib/types';
import { Thesis } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { Table } from '@tanstack/react-table';
import { AnimatePresence, motion } from 'framer-motion';
import { parseAsBoolean, useQueryState, useQueryStates } from 'nuqs';
import { Combobox } from './combobox';
import { Button } from './ui/button';

type FiltersProps = {
  initialNum?: number;
  canExpand?: boolean;
  filterIds?: ColumnID[];
};

export default function Filters({
  filterIds,
  initialNum = 3,
  canExpand = false,
}: FiltersProps) {
  const [moreFilters, setMoreFilters] = useQueryState(
    'more',
    parseAsBoolean.withDefault(false)
  );
  const { data: table } = useQuery<Table<Thesis>>({
    queryKey: ['thesesTable'],
  });
  const [filtersQuery] = useQueryStates(filterParsers, {
    urlKeys: filterUrlKeys,
  });

  const columnFilters = (filterIds ?? Object.keys(FILTERS)).map((id) => {
    const defaultValue = Object.entries(filtersQuery).find(
      (entry) => id === entry[0]
    )?.[1];
    if (defaultValue) return { id, defaultValue: defaultValue.toString() };
    return { id, defaultValue: undefined };
  });

  const initial = columnFilters.slice(0, initialNum);
  const extension = columnFilters.slice(initialNum);

  function toggleMoreFilters() {
    setMoreFilters((prev) => !prev);
  }

  function handleValueChanged(id: string, value?: string) {
    table?.getColumn(id)?.setFilterValue(value);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {initial.map(({ id, defaultValue }) => (
        <motion.div layout key={id} transition={{ type: 'tween' }}>
          <Combobox
            id={id}
            className="flex"
            defaultValue={defaultValue}
            onValueChanged={(value) => handleValueChanged(id, value)}
            queryFn={FILTERS[id]}
          />
        </motion.div>
      ))}
      <AnimatePresence mode="popLayout">
        {moreFilters &&
          extension.map(({ id, defaultValue }) => (
            <motion.div
              key={id}
              layout
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -60, opacity: 0 }}
              transition={{ type: 'tween' }}
            >
              <Combobox
                id={id}
                className="flex"
                defaultValue={defaultValue}
                onValueChanged={(value) => handleValueChanged(id, value)}
                queryFn={FILTERS[id]}
              />
            </motion.div>
          ))}
      </AnimatePresence>
      {!canExpand && (
        <motion.div
          layout
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'tween' }}
        >
          <Button
            variant="ghost"
            size="sm"
            role="checkbox"
            aria-checked={moreFilters}
            className="text-xs font-semibold text-secondary/80 hover:bg-transparent hover:text-secondary"
            onClick={toggleMoreFilters}
          >
            {moreFilters ? 'Less filters' : 'More filters'}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
