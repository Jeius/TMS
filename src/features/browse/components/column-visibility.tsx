'use client'

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Thesis } from '@/lib/types';
import { PopoverClose } from '@radix-ui/react-popover';
import { Column } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { Plus, PlusIcon } from 'lucide-react';
import { useCallback } from 'react';
import useThesisTable from '../lib/hooks/use-thesis-table';

type VisibilityTypeProps = {
    columns?: Column<Thesis, unknown>[];
    onClick: (column: Column<Thesis, unknown>) => void;
}

function ColumnType({ columns, onClick: handleClick }: VisibilityTypeProps) {
    return (
        <div className="p-2 sm:w-full sm:max-w-xs min-w-[13.125rem] lg:min-w-[17.5rem]">
            <div className="py-3 px-4 font-semibold">
                <h3>Add Columns</h3>
            </div>
            {columns?.map(col => (
                <Button
                    key={col.id}
                    variant="ghost"
                    size="sm"
                    className="flex justify-start items-center capitalize w-full"
                    onClick={() => handleClick(col)}
                >
                    <Plus aria-hidden="true" focusable="false" />
                    <motion.span
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="line-clamp-2 text-left truncate"
                    >
                        {col.id.replace(/([a-z])([A-Z])/g, '$1 $2')}
                    </motion.span>
                </Button>
            ))}
        </div>
    );
}

function PopoverType({ columns, onClick: handleClick }: VisibilityTypeProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size='sm' className='font-semibold'>
                    Add Columns
                </Button>
            </PopoverTrigger>
            <PopoverContent align='end' className='p-2 w-fit sm:w-52 z-10'>
                <h3 className='sr-only'>Select columns to add</h3>
                <ul className='flex flex-col'>
                    {columns?.length
                        ? (columns?.map((col) => (
                            <li key={col.id}>
                                <PopoverClose asChild>
                                    <Button
                                        size='sm'
                                        variant='ghost'
                                        className='capitalize w-full justify-start text-xs'
                                        onClick={() => handleClick(col)}
                                    >
                                        <PlusIcon aria-hidden='true' />
                                        {col.id.replace(/([a-z])([A-Z])/g, '$1 $2')}
                                    </Button>
                                </PopoverClose>
                            </li>
                        )))
                        : (
                            <li className="mx-auto text-xs p-4">Nothing to add...</li>
                        )}
                </ul>
            </PopoverContent>
        </Popover>
    );
}

export function ColumnVisibilityControl({ type }: { type: 'popover' | 'column' }) {
    const table = useThesisTable();
    const tableCols = table.getAllColumns();
    const filteredCols = tableCols.filter((column) => column.getCanHide() && !column.getIsVisible());

    const handleClick = useCallback((column: Column<Thesis, unknown>) => {
        column.toggleVisibility(true);
        const orderState = table.getState().columnOrder;
        const newOrder = orderState.filter(col => col !== column.id);
        table.setColumnOrder([...newOrder, column.id]);
    }, [table]);

    if (type === 'popover') return <PopoverType columns={filteredCols} onClick={handleClick} />;
    if (type === 'column') return <ColumnType columns={filteredCols} onClick={handleClick} />;
}
