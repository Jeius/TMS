'use client';

import { Combobox, ComboboxItem } from '@/components/combobox';
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

  function handleValueChanged(id: string, item?: ComboboxItem) {
    table?.getColumn(id)?.setFilterValue(item?.value);
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
      <div className="flex flex-wrap items-center gap-2">
        {initial.map(({ id, defaultValue }) => (
          <Combobox
            id={id}
            key={`${id}-filter`}
            placeholder={id}
            defaultValue={defaultValue}
            onItemChanged={handleValueChanged}
            queryFn={FILTERS[id]}
            externalResetTrigger={resetTrigger}
          />
        ))}
        <AnimatePresence mode="popLayout">
          {moreFilters &&
            extension.map(({ id, defaultValue }) => (
              <motion.div
                key={`${id}-filter`}
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -60, opacity: 0 }}
                transition={{ type: 'tween' }}
              >
                <Combobox
                  id={id}
                  defaultValue={defaultValue}
                  placeholder={id}
                  onItemChanged={handleValueChanged}
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
            variant="text"
            size="text"
            role="checkbox"
            aria-checked={moreFilters}
            className="text-xs font-semibold text-secondary/80 hover:text-secondary"
            onClick={toggleMoreFilters}
          >
            {moreFilters ? 'Less filters' : 'More filters'}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
