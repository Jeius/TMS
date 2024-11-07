import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import responsivePx from '@/lib/responsive-px'
import { Thesis } from '@/lib/types'
import { cn } from '@/lib/utils'
import { ColumnDef, Row, Table } from '@tanstack/react-table'
import { HTMLMotionProps, motion } from 'framer-motion'
import { Dot, X } from 'lucide-react'
import Link from 'next/link'
import { COLUMN_IDS } from '../lib/constants'


export const columns = [createMainColumn(), ...createColumns(COLUMN_IDS)];

export function createColumns(columnsData: string[]): ColumnDef<Thesis>[] {
    return columnsData.map(accessorKey => {
        return {
            id: accessorKey,
            accessorKey,
            size: responsivePx(200),
            minSize: responsivePx(50),
            maxSize: responsivePx(600),
            sortingFn: 'alphanumeric',
            filterFn: 'includesString',
            enablePinning: false,
            header: ({ table }: { table: Table<Thesis> }) => (
                <ColumnHeader table={table} accessorKey={accessorKey} />
            ),
            cell: ({ row }: { row: Row<Thesis> }) => (
                <ColumnCell accessorKey={accessorKey} row={row} />
            ),
        }
    })
}

export function createMainColumn(): ColumnDef<Thesis> {
    return {
        id: 'theses',
        accessorKey: 'title',
        size: responsivePx(600),
        minSize: responsivePx(300),
        maxSize: responsivePx(800),
        sortingFn: 'alphanumeric',
        filterFn: 'includesString',
        enableHiding: false,
        header: ({ table }: { table: Table<Thesis> }) => (
            <MainColumnHeader id='theses' table={table} />
        ),
        cell: ({ row }: { row: Row<Thesis> }) => (
            <MainColumnCell row={row} />
        ),
    };
}


function MainColumnHeader<TData>({ table, id }: { table: Table<TData>, id: string }) {
    return (
        <div className="flex items-center space-x-3 text-foreground min-w-32">
            <Checkbox id={id}
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                className="ml-1"
                aria-label="Select all"
            />
            <h3 className="leading-none capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {id}
            </h3>
        </div>)
}


function MainColumnCell<TData>({ row }: { row: Row<TData> }) {
    const title = row.getValue('title') as string
    const author = row.getValue('author') as string
    const year = row.getValue('year') as string
    const department = row.getValue('department') as string

    return (
        <div className="flex text-pretty text-left">
            <Checkbox
                className="my-auto ml-1"
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label={`Select ${title}`}
            />
            <div className="flex flex-col space-y-1 p-2">
                <Button variant="link" data-title={title} asChild
                    className="p-1 h-fit whitespace-normal justify-start font-bold text-secondary"
                >
                    <Link href={'#'}>
                        <h3 className="lg:text-base line-clamp-3 text-ellipsis">{title}</h3>
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
            className='text-pretty'
            {...props}
        >
            {row.getValue(accessorKey)}
        </motion.div>
    )
}

type ColumnHeaderProps<TData> = HTMLMotionProps<'div'> & {
    table: Table<TData>;
    accessorKey: string;
}

function ColumnHeader<TData>({ accessorKey, table, className, ...props }: ColumnHeaderProps<TData>) {
    function handleClick() {
        table?.getColumn(accessorKey)?.toggleVisibility(false);
    }

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
                {
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            aria-label="Remove column"
                            className="rounded-full p-0.5 size-5 text-muted-foreground hover:text-foreground hover:bg-transparent"
                            onClick={handleClick}
                        >
                            <X aria-hidden="true" />
                        </Button>
                    </TooltipTrigger>
                }
            </motion.div>
            <TooltipContent>
                <p>Remove column</p>
            </TooltipContent>
        </Tooltip>
    );
}