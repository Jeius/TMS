'use client'

import { Thesis } from '@/lib/types';
import { booleanToString, stringToBoolean } from '@/lib/utils';
import { fetchMockFilterIds } from '@/mock/actions/fetch-filters';
import { useQuery } from '@tanstack/react-query';
import { Table } from '@tanstack/react-table';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Combobox } from './combobox';
import { Button } from './ui/button';

type FiltersProps = {
    initial?: number
    canExpand?: boolean
    filterIds?: string[]
}

export default function Filters({
    filterIds,
    initial = 3,
    canExpand = false,
}: FiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showMoreFilters, setShowMoreFilters] = useState(searchParams.get('moreFilters'));
    const { data: table } = useQuery<Table<Thesis>>({ queryKey: ['thesesTable'] });

    const { data: fetchedFiltersIds = [] } = useQuery({
        queryKey: ['filterIds'],
        queryFn: fetchMockFilterIds,
        enabled: !filterIds,
    });

    const columns = table?.getAllLeafColumns();
    const columnFilters = (filterIds ?? fetchedFiltersIds).map(filterId => ({
        id: filterId,
        value: searchParams.get(filterId) ?? undefined,
    }));

    const initialFilters = columnFilters.slice(0, initial);
    const moreFilters = columnFilters.slice(initial);

    const filterValues = useMemo(() => {
        const columnFilterIds = columnFilters.map(({ id }) => id);
        return columns?.filter(({ id }) => columnFilterIds.includes(id)).map(col => {
            const uniqueValuesMap = col.getFacetedUniqueValues().keys();
            return { id: col.id, values: Array.from(uniqueValuesMap) as string[] }
        }) ?? [];
    }, [columns, columnFilters]);

    function updateSearchParams(key: string, value?: string) {
        const currentParams = new URLSearchParams(searchParams.toString());
        if (value) {
            currentParams.set(key, value);
        } else {
            currentParams.delete(key);
        }
        router.replace(`?${currentParams.toString()}`, { scroll: false });
    }

    function toggleMoreFilters() {
        const value = !stringToBoolean(showMoreFilters);
        updateSearchParams('moreFilters', booleanToString(value));
        setShowMoreFilters(booleanToString(value));
    }

    function handleValueChanged(id: string, value?: string) {
        table?.getColumn(id)?.setFilterValue(value);
        if (value === undefined) updateSearchParams(id, value);
    }

    return (
        <div className="flex gap-2 flex-wrap">
            {initialFilters.map(({ id, value }) => (
                <motion.div layout key={id} transition={{ type: 'tween' }}>
                    <Combobox
                        className="flex"
                        placeholder={id}
                        defaultValue={value}
                        onValueChanged={(value) => handleValueChanged(id, value)}
                        items={filterValues.find(item => item.id === id)?.values}
                    />
                </motion.div>
            ))}
            <AnimatePresence mode="popLayout">
                {stringToBoolean(showMoreFilters) && moreFilters.map(({ id, value }) => (
                    <motion.div key={id}
                        layout
                        initial={{ x: -60, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -60, opacity: 0 }}
                        transition={{ type: 'tween' }}
                    >
                        <Combobox
                            className="flex"
                            placeholder={id}
                            defaultValue={value}
                            onValueChanged={(value) => handleValueChanged(id, value)}
                            items={filterValues.find(item => item.id === id)?.values}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
            {!canExpand && (
                <motion.div layout
                    initial={{ x: -60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: 'tween' }}
                >
                    <Button
                        variant="ghost"
                        size="sm"
                        role='checkbox'
                        aria-checked={stringToBoolean(showMoreFilters)}
                        className="text-secondary/80 hover:text-secondary hover:bg-transparent font-semibold text-xs"
                        onClick={toggleMoreFilters}
                    >
                        {stringToBoolean(showMoreFilters) ? 'Less filters' : 'More filters'}
                    </Button>
                </motion.div>
            )}
        </div>
    );
}