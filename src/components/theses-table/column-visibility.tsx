import { Button } from '@/components/ui/button';
import { Table } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';

export function VisibilityColumn<TData>({ table }: { table: Table<TData> }) {
    return (
        <div className="lg:mr-24 p-2 sm:w-full sm:max-w-xs min-w-[215px] lg:min-w-[288px]">
            <div className="py-3 px-4 font-semibold">
                <h3>Add Columns</h3>
            </div>
            {table
                .getAllColumns()
                .filter(column => column.getCanHide() && !column.getIsVisible())
                .map(column => (
                    <Button
                        key={column.id}
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-2 capitalize w-full"
                        onClick={() => column.toggleVisibility(true)}
                    >
                        <Plus aria-hidden="true" focusable="false" size={16} />
                        <span className="line-clamp-2 w-full overflow-hidden text-left capitalize text-ellipsis">
                            {column.id.replace(/([a-z])([A-Z])/g, '$1 $2')}
                        </span>
                    </Button>
                ))}
        </div>
    );
}

export function VisibilityMenu<TData>({ table }: { table: Table<TData> }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size="sm"
                    variant="gradient"
                >
                    <Plus className="mr-2" size={16} aria-hidden="true" />
                    <span>Add Columns</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
                <DropdownMenuLabel>Select Columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                    .getAllColumns()
                    .filter(
                        (column) => typeof column.accessorFn !== "undefined" && column.getCanHide() && !column.getIsVisible()
                    )
                    .map((column) => {
                        return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                            >
                                {column.id.replace(/([a-z])([A-Z])/g, '$1 $2')}
                            </DropdownMenuCheckboxItem>
                        );
                    })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}