'use client'

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Thesis } from '@/lib/types';
import { PopoverClose } from '@radix-ui/react-popover';
import { useQuery } from '@tanstack/react-query';
import { Column, Table } from '@tanstack/react-table';
import { Plus, PlusIcon } from 'lucide-react';

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
                    className="flex justify-start items-center space-x-2 capitalize w-full"
                    onClick={() => handleClick(col)}
                >
                    <Plus aria-hidden="true" focusable="false" size='1rem' />
                    <span className="line-clamp-2 text-left truncate">
                        {col.id.replace(/([a-z])([A-Z])/g, '$1 $2')}
                    </span>
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
            <PopoverContent align='end' className='p-1 w-fit sm:p-2 sm:w-52 z-10'>
                <h3 className='sr-only'>Select columns to add</h3>
                <ul className='flex flex-col'>
                    {columns?.length
                        ? (columns?.map((column) => (
                            <li key={column.id}>
                                <PopoverClose asChild>
                                    <Button
                                        size='sm'
                                        variant='ghost'
                                        className='capitalize w-full justify-start text-xs'
                                        onClick={() => handleClick(column)}
                                    >
                                        <PlusIcon aria-hidden='true' size='1rem' className='mr-2' />
                                        {column.id.replace(/([a-z])([A-Z])/g, '$1 $2')}
                                    </Button>
                                </PopoverClose>
                            </li>
                        )))
                        : (
                            <li className="mx-auto text-sm">Nothing to add...</li>
                        )}
                </ul>
            </PopoverContent>
        </Popover>
    );
}

export function ColumnVisibilityControl({ type }: { type: 'popover' | 'column' }) {
    const { data: table } = useQuery<Table<Thesis>>({ queryKey: ['thesesTable'] });
    const columns = table && table.getAllColumns().filter((column) => column.getCanHide() && !column.getIsVisible());

    function handleClick(column: Column<Thesis, unknown>) {
        column.toggleVisibility(true);

        const columns = table?.getAllFlatColumns();
        if (columns) {
            const newOrder = columns
                .filter(col => col.id !== column.id && col.getIsVisible())
                .map(col => col.id);
            table?.setColumnOrder([...newOrder, column.id]);
        }
    }

    if (type === 'popover') return <PopoverType columns={columns} onClick={handleClick} />;
    if (type === 'column') return <ColumnType columns={columns} onClick={handleClick} />;
}
