import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table } from '@tanstack/react-table';
import { Plus } from 'lucide-react';

export function VisibilityColumn<TData>({ table }: { table: Table<TData> }) {
    const columns = table.getAllColumns().filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide() && !column.getIsVisible());
    return (
        <div className="p-2 sm:w-full sm:max-w-xs min-w-[210px] lg:min-w-[280px]">
            <div className="py-3 px-4 font-semibold">
                <h3>Add Columns</h3>
            </div>
            {columns.map(column => (
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
    const columns = table.getAllColumns().filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide() && !column.getIsVisible());
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="gradient"
                    className="px-2 text-xs"
                >
                    <Plus className="mr-2" size={16} aria-hidden="true" />
                    <span>Add Columns</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px] min-h-[100px]">
                <DropdownMenuLabel>Select Columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {columns.length
                    ? (columns.map((column) => {
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
                    }))
                    : (<DropdownMenuItem disabled><span className="mx-auto text-sm">Nothing to add...</span></DropdownMenuItem>)}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}