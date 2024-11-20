import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import responsivePx from '@/lib/responsive-px';
import { Thesis } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ColumnDef, Row, Table } from '@tanstack/react-table';
import { HTMLMotionProps, motion } from 'framer-motion';
import { Dot, X } from 'lucide-react';
import Link from 'next/link';
import { COLUMN_IDS } from '../lib/constants';

export const columns = [createMainColumn(), ...createColumns()];

export function createColumns(): ColumnDef<Thesis>[] {
  return COLUMN_IDS.map((accessorKey) => {
    return {
      id: accessorKey,
      accessorKey,
      size: responsivePx(200),
      minSize: responsivePx(120),
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
    };
  });
}

export function createMainColumn(): ColumnDef<Thesis> {
  return {
    id: 'theses',
    accessorKey: 'title',
    size: responsivePx(420),
    minSize: responsivePx(300),
    maxSize: responsivePx(600),
    sortingFn: 'alphanumeric',
    filterFn: 'includesString',
    enableHiding: false,
    header: ({ table }: { table: Table<Thesis> }) => (
      <MainColumnHeader id="theses" table={table} />
    ),
    cell: ({ row }: { row: Row<Thesis> }) => <MainColumnCell row={row} />,
  };
}

function MainColumnHeader<TData>({
  table,
  id,
}: {
  table: Table<TData>;
  id: string;
}) {
  return (
    <div className="flex min-w-32 items-center space-x-3 text-foreground">
      <Checkbox
        id={id}
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        className="ml-1"
        aria-label="Select all"
      />
      <h3 className="capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {id}
      </h3>
    </div>
  );
}

function MainColumnCell({ row }: { row: Row<Thesis> }) {
  const title = row.getValue('title') as string;
  const authors = row.getValue('authors') as string[];
  const year = row.getValue('year') as string;
  const department = row.getValue('department') as string;

  return (
    <div className="flex text-pretty text-left">
      <Checkbox
        className="my-auto ml-1"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={`Select ${title}`}
      />
      <div className="flex flex-col space-y-1 p-2">
        <Button
          variant="link"
          data-title={title}
          asChild
          className="h-fit justify-start whitespace-normal p-1 font-bold text-secondary"
        >
          <Link href={'#'}>
            <h3 className="line-clamp-3 text-ellipsis lg:text-base">{title}</h3>
          </Link>
        </Button>

        <ul
          className="gap-1 px-1 text-xs font-semibold"
          data-author-list={authors}
        >
          {authors.map((author, i) => (
            <li key={i}>
              {author}
              <span className="last:hidden">,</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-1 px-1 text-sm xs:flex-row xs:items-center">
          <span>{year}</span>
          <Dot
            size="1.5rem"
            aria-hidden="true"
            className="hidden shrink-0 xs:block"
          />
          <span>{department}</span>
        </div>
      </div>
    </div>
  );
}

type ColumnCellProps = HTMLMotionProps<'div'> & {
  row: Row<Thesis>;
  accessorKey: string;
};

function ColumnCell({ accessorKey, row, ...props }: ColumnCellProps) {
  const rowValue = row.getValue(accessorKey);

  return (
    <>
      {Array.isArray(rowValue) && (
        <motion.ul
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.22 }}
          className="flex flex-col gap-2 text-pretty"
        >
          {rowValue.map((value, i) => (
            <li key={i}>{value}</li>
          ))}
        </motion.ul>
      )}

      {(typeof rowValue === 'string' || typeof rowValue === 'number') && (
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.22 }}
          className="text-pretty"
          {...props}
        >
          {rowValue}
        </motion.div>
      )}
    </>
  );
}

type ColumnHeaderProps<TData> = HTMLMotionProps<'div'> & {
  table: Table<TData>;
  accessorKey: string;
};

function ColumnHeader<TData>({
  accessorKey,
  table,
  className,
  ...props
}: ColumnHeaderProps<TData>) {
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
              size="icon"
              variant="ghost"
              aria-label="Remove column"
              className="size-fit p-1 text-muted-foreground hover:bg-transparent hover:text-foreground"
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
