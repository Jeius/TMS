'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { PopoverClose } from '@radix-ui/react-popover';
import { SortingState } from '@tanstack/react-table';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SORT_VALUES } from '../lib/constants';
import { getSortValue } from '../lib/hooks/use-sort-state';
import useThesisTable from '../lib/hooks/use-thesis-table';

export default function SortOptions() {
  const table = useThesisTable();
  const [sortState, setSortState] = useState<SortingState>(
    table.getState().sorting
  );
  const selectedValue = getSortValue(sortState);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const id = e.currentTarget.value;
    const sortValue = SORT_VALUES.find((item) => item.id === id);
    const columnSort = sortValue?.value;
    if (columnSort) {
      table.setSorting([columnSort]);
      setSortState([columnSort]);
    }
  };

  useEffect(() => setSortState(table?.getState().sorting), [table]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs capitalize">
          Sort by: {selectedValue?.label}
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="z-10 w-fit p-1 sm:w-52 sm:p-2">
        <h3 className="sr-only">Select a sort option</h3>
        <ul>
          {SORT_VALUES.map(({ label, id }) => (
            <li key={id}>
              <PopoverClose asChild>
                <Button
                  value={id}
                  variant="ghost"
                  onClick={handleClick}
                  className="w-full justify-start text-xs"
                >
                  <CheckIcon
                    aria-hidden="true"
                    data-selected={label === selectedValue?.label}
                    className="opacity-0 data-[selected=true]:opacity-100"
                  />
                  {label}
                </Button>
              </PopoverClose>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
