import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PopoverClose } from '@radix-ui/react-popover';
import { Table } from '@tanstack/react-table';
import { Plus, PlusIcon } from 'lucide-react';

export function VisibilityColumn<TData>({ table }: { table: Table<TData> }) {
    const columns = table.getAllColumns().filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide() && !column.getIsVisible());
    return (
        <div className="p-2 sm:w-full sm:max-w-xs min-w-[13.125rem] lg:min-w-[17.5rem]">
            <div className="py-3 px-4 font-semibold">
                <h3>Add Columns</h3>
            </div>
            {columns.map(column => (
                <Button
                    key={column.id}
                    variant="ghost"
                    size="sm"
                    className="flex justify-start items-center space-x-2 capitalize w-full"
                    onClick={() => column.toggleVisibility(true)}
                >
                    <Plus aria-hidden="true" focusable="false" size='1rem' />
                    <span className="line-clamp-2 text-left truncate">
                        {column.id.replace(/([a-z])([A-Z])/g, '$1 $2')}
                    </span>
                </Button>
            ))}
        </div>
    );
}

export function VisibilityMenu<TData>({ table }: { table: Table<TData> }) {
    const columns = table
        .getAllColumns()
        .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide() && !column.getIsVisible());

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
                    {columns.length
                        ? (columns.map((column) => (
                            <li key={column.id}>
                                <PopoverClose asChild>
                                    <Button
                                        size='sm'
                                        variant='ghost'
                                        className='capitalize w-full justify-start text-xs'
                                        onClick={() => column.toggleVisibility(true)}
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