'use client'

import { fetchUniqueDataByColumnId } from '@/features/browse/lib/actions';
import { FILTER_IDS } from '@/features/browse/lib/constants';
import { ColumnID } from '@/features/browse/lib/types';
import { Thesis } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { Table } from '@tanstack/react-table';
import { AnimatePresence, motion } from 'framer-motion';
import { parseAsBoolean, useQueryState } from 'nuqs';
import { Combobox } from './combobox';
import { Button } from './ui/button';


type FiltersProps = {
    initialNum?: number
    canExpand?: boolean
    filterIds?: ColumnID[]
}

export default function Filters({
    filterIds,
    initialNum = 3,
    canExpand = false,
}: FiltersProps) {
    const [moreFilters, setMoreFilters] = useQueryState('more', parseAsBoolean.withDefault(false));
    const { data: table } = useQuery<Table<Thesis>>({ queryKey: ['thesesTable'] });

    console.log('filterIds:', filterIds);
    console.log('FILTER_IDS:', FILTER_IDS);


    const columnFilters = (filterIds ?? FILTER_IDS).map(filterId => ({
        id: filterId,
        defaultValue: undefined,
    }));

    const initial = columnFilters.slice(0, initialNum);
    const extension = columnFilters.slice(initialNum);

    function toggleMoreFilters() {
        setMoreFilters(prev => !prev)
    }

    function handleValueChanged(id: string, value?: string) {
        table?.getColumn(id)?.setFilterValue(value);
    }

    return (
        <div className="flex gap-2 flex-wrap">
            {initial.map(({ id, defaultValue }) => (
                <motion.div layout key={id} transition={{ type: 'tween' }}>
                    <Combobox
                        id={id}
                        className="flex"
                        defaultValue={defaultValue}
                        onValueChanged={(value) => handleValueChanged(id, value)}
                        queryFn={fetchUniqueDataByColumnId}
                    />
                </motion.div>
            ))}
            <AnimatePresence mode="popLayout">
                {moreFilters && extension.map(({ id, defaultValue }) => (
                    <motion.div key={id}
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
                            queryFn={fetchUniqueDataByColumnId}
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
                        aria-checked={moreFilters}
                        className="text-secondary/80 hover:text-secondary hover:bg-transparent font-semibold text-xs"
                        onClick={toggleMoreFilters}
                    >
                        {moreFilters ? 'Less filters' : 'More filters'}
                    </Button>
                </motion.div>
            )}
        </div>
    );
}