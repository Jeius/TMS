'use client';

import { Combobox } from '@/components/combobox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FILTERS } from '@/features/browse/lib/constants';
import { AnimatePresence, motion } from 'framer-motion';
import { FilterX } from 'lucide-react';
import { parseAsBoolean, useQueryState } from 'nuqs';
import { useState } from 'react';
import useThesisTable from '../lib/hooks/use-thesis-table';

const INITIALFILTERS = 3;

export default function Filters() {
  const [resetTrigger, setResetTrigger] = useState(false);
  const [moreFilters, setMoreFilters] = useQueryState(
    'more',
    parseAsBoolean.withDefault(false)
  );

  const table = useThesisTable();
  const colFilterState = table.getState().columnFilters;
  const colFilters = Object.keys(FILTERS).map((filterId) => {
    const defaultValue = colFilterState.find(
      ({ id }) => id === filterId
    )?.value;
    return {
      id: filterId,
      defaultValue: defaultValue?.toString() || undefined,
    };
  });

  const initial = colFilters.slice(0, INITIALFILTERS);
  const extension = colFilters.slice(INITIALFILTERS);

  function toggleMoreFilters() {
    setMoreFilters((prev) => !prev);
  }

  function handleValueChanged(id: string, value?: string) {
    table?.getColumn(id)?.setFilterValue(value);
    setResetTrigger(false);
  }

  function clearFilters() {
    table.setColumnFilters([]);
    setResetTrigger(true);
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex items-center gap-2">
        <Input placeholder="Filter by keywords..." />
        {colFilterState.length ? (
          <Button
            variant="destructive"
            aria-label="Remove Filters"
            title="Remove Filters"
            onClick={clearFilters}
            className="size-fit p-2"
          >
            <FilterX aria-hidden="true" className="shrink-0" />
          </Button>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2">
        {initial.map(({ id, defaultValue }) => (
          <div key={id}>
            <Combobox
              id={id}
              key={`${id}-${defaultValue}`}
              defaultValue={defaultValue}
              onValueChanged={handleValueChanged}
              queryFn={FILTERS[id]}
              externalResetTrigger={resetTrigger}
            />
          </div>
        ))}
        <AnimatePresence mode="popLayout">
          {moreFilters &&
            extension.map(({ id, defaultValue }) => (
              <motion.div
                key={id}
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -60, opacity: 0 }}
                transition={{ type: 'tween' }}
              >
                <Combobox
                  id={id}
                  key={`${id}-${defaultValue}`}
                  defaultValue={defaultValue}
                  onValueChanged={handleValueChanged}
                  queryFn={FILTERS[id]}
                  externalResetTrigger={resetTrigger}
                />
              </motion.div>
            ))}
        </AnimatePresence>
        <motion.div
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
    </div>
  );
}
