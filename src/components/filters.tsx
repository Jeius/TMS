'use client'

import { fetchFilters } from '@/features/browse/lib/actions';
import { booleanToString, stringToBoolean } from '@/lib/utils';
import { fetchFilterValues } from '@/mock/actions/fetch-filters';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Combobox } from './combobox';
import { Button } from './ui/button';

type FiltersProps = {
    showInitial?: number
    hideShowMore?: boolean
    filters?: string[]
}

export default function Filters({
    filters,
    showInitial = 3,
    hideShowMore = false,
}: FiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showMoreFilters, setShowMoreFilters] = useState(stringToBoolean(searchParams.get('moreFilters')));

    const { data: fetchedFilters = [] } = useQuery<string[]>({
        queryKey: ['filters'],
        queryFn: fetchFilters,
        enabled: !filters,
    });

    const filtersWithDefaults = (filters ?? fetchedFilters).map(filter => ({
        key: filter,
        value: searchParams.get(filter) ?? '',
    }));

    const initialFilters = filtersWithDefaults.slice(0, showInitial);
    const moreFilters = filtersWithDefaults.slice(showInitial);

    const updateSearchParams = (key: string, value: string) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        if (value) {
            currentParams.set(key, value);
        } else {
            currentParams.delete(key);
        }
        router.replace(`?${currentParams.toString()}`);
    };

    const toggleMoreFilters = () => {
        updateSearchParams('moreFilters', booleanToString(!showMoreFilters));
        setShowMoreFilters(prev => !prev);
    };

    return (
        <div className="flex gap-2 flex-wrap">
            {initialFilters.map(({ key, value }) => (
                <motion.div layout key={key} transition={{ type: 'tween' }}>
                    <Combobox
                        className="flex"
                        itemsKey={key}
                        placeholder={key}
                        defaultValue={value}
                        onValueChanged={(value) => updateSearchParams(key, value)}
                        items={() => fetchFilterValues(key)}
                    />
                </motion.div>
            ))}
            <AnimatePresence mode="popLayout">
                {showMoreFilters && moreFilters.map(({ key, value }) => (
                    <motion.div key={key}
                        layout
                        initial={{ x: -60, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -60, opacity: 0 }}
                        transition={{ type: 'tween' }}
                    >
                        <Combobox
                            className="flex"
                            itemsKey={key}
                            placeholder={key}
                            defaultValue={value}
                            onValueChanged={(value) => updateSearchParams(key, value)}
                            items={() => fetchFilterValues(key)}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
            {!hideShowMore && (
                <motion.div layout
                    initial={{ x: -60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: 'tween' }}
                >
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-secondary/80 hover:text-secondary hover:bg-transparent font-semibold text-xs"
                        onClick={toggleMoreFilters}
                    >
                        {showMoreFilters ? 'Less filters' : 'More filters'}
                    </Button>
                </motion.div>
            )}
        </div>
    );
}