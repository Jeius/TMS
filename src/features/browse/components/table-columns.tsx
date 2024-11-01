'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Thesis } from '@/lib/types'
import { cn } from '@/lib/utils'
import { ColumnDef, Row, Table } from '@tanstack/react-table'
import { HTMLMotionProps, motion } from 'framer-motion'
import { Dot, X } from 'lucide-react'
import Link from 'next/link'

type ColumnsData = {
    accessorKey: string
    isMainColumn?: boolean
}

const columnsData: ColumnsData[] = [
    { accessorKey: 'title', isMainColumn: true },
    { accessorKey: 'author' },
    { accessorKey: 'year' },
    { accessorKey: 'adviser' },
    { accessorKey: 'specialization' },
    { accessorKey: 'department' },
    { accessorKey: 'dateUploaded', },
];

const createColumns = (columnsData: ColumnsData[]) => {
    return columnsData.map(({ accessorKey, isMainColumn }): ColumnDef<Thesis> => {
        return {
            accessorKey,
            header: ({ table }: { table: Table<Thesis> }) => (
                isMainColumn ? (
                    <MainColumnHeader table={table} />
                ) : (
                    <ColumnHeader table={table} accessorKey={accessorKey} />
                )
            ),
            cell: ({ row }: { row: Row<Thesis> }) => (
                isMainColumn ? (
                    <MainColumnCell row={row} />
                ) : (
                    <ColumnCell accessorKey={accessorKey} row={row} />
                )
            ),
        }
    });
};

type MainColumnHeaderProps<TData> = { table: Table<TData> }

function MainColumnHeader<TData>({ table }: MainColumnHeaderProps<TData>) {
    return (
        <div className="flex items-center space-x-3 text-foreground min-w-32">
            <Checkbox id="theses"
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                className="ml-1"
                aria-label="Select all"
            />
            <label
                htmlFor="theses"
                className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >Theses</label>
        </div>)
}

type MainColumnCellProps<TData> = { row: Row<TData> }

function MainColumnCell<TData>({ row }: MainColumnCellProps<TData>) {
    const title = row.getValue('title') as string
    const author = row.getValue('author') as string
    const year = row.getValue('year') as string
    const department = row.getValue('department') as string

    return (
        <div className="flex text-pretty text-left">
            <Checkbox className="my-auto ml-1"
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label={`Select ${title}`} />
            <div className="flex flex-col space-y-1 p-2">
                <Button variant="link" data-title={title} asChild
                    className="p-1 h-fit whitespace-normal justify-start font-bold text-secondary"
                >
                    <Link href={'#'}>
                        <h3 className="line-clamp-3 text-ellipsis">{title}</h3>
                    </Link>
                </Button>

                <div className="px-1 text-xs font-semibold" data-author-list={author}>
                    <span>{author}</span>
                </div>
                <div className="px-1 flex flex-col xs:flex-row gap-1 xs:items-center text-sm">
                    <span>{year}</span>
                    <Dot size='1.5rem' aria-hidden="true" className='hidden xs:block shrink-0' />
                    <span>{department}</span>
                </div>
            </div>
        </div>
    )
}

type ColumnCellProps<TData> = HTMLMotionProps<'div'> & {
    row: Row<TData>;
    accessorKey: string;
}

function ColumnCell<TData>({ accessorKey, row, ...props }: ColumnCellProps<TData>) {
    return (
        <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.22 }}
            {...props}
        >
            {row.getValue(accessorKey)}
        </motion.div>
    )
}

type ColumnHeaderProps<TData> = HTMLMotionProps<'div'> & {
    table: Table<TData>;
    accessorKey: string;
    hideClose?: boolean;
}

function ColumnHeader<TData>({ accessorKey, table, hideClose = false, className, ...props }: ColumnHeaderProps<TData>) {
    return (
        <Tooltip>
            <motion.div
                className={cn('flex items-center justify-between space-x-2', className)}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', bounce: 0.2 }}
                {...props}
            >
                <span className="capitalize">
                    {accessorKey.replace(/([a-z])([A-Z])/g, '$1 $2')}
                </span>
                {!hideClose && (
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            aria-label="Remove column"
                            className="rounded-full p-0.5 size-5 text-muted-foreground hover:text-foreground hover:bg-transparent"
                            onClick={() => table?.getColumn(accessorKey)?.toggleVisibility(false)}
                        >
                            <X aria-hidden="true" />
                        </Button>
                    </TooltipTrigger>
                )}
            </motion.div>
            <TooltipContent>
                <p>Remove column</p>
            </TooltipContent>
        </Tooltip>
    );
}

export const columns = createColumns(columnsData);