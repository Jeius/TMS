'use client';

import { Combobox } from '@/components/combobox';
import { Button } from '@/components/ui/button';
import { FILTERS } from '@/features/browse/lib/constants';
import {
  filterParsers,
  filterUrlKeys,
} from '@/features/browse/lib/hooks/use-filter-state';
import { AnimatePresence, motion } from 'framer-motion';
import { parseAsBoolean, useQueryState, useQueryStates } from 'nuqs';
import useThesisTable from '../lib/hooks/use-thesis-table';

const INITIALFILTERS = 3;

export default function Filters() {
  const [moreFilters, setMoreFilters] = useQueryState(
    'more',
    parseAsBoolean.withDefault(false)
  );

  const [filtersQuery] = useQueryStates(filterParsers, {
    urlKeys: filterUrlKeys,
  });

  const columnFilters = Object.keys(FILTERS).map((id) => {
    const defaultValue = Object.entries(filtersQuery).find(
      (entry) => id === entry[0]
    )?.[1];
    if (defaultValue) return { id, defaultValue: defaultValue.toString() };
    return { id, defaultValue: undefined };
  });

  const table = useThesisTable();
  const initial = columnFilters.slice(0, INITIALFILTERS);
  const extension = columnFilters.slice(INITIALFILTERS);

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
                defaultValue={defaultValue}
                onValueChanged={(value) => handleValueChanged(id, value)}
                queryFn={FILTERS[id]}
              />
            </motion.div>
          ))}
      </AnimatePresence>
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
    </div>
  );
}
