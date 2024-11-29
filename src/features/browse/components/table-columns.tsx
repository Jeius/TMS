import {
  Dialog,
  DialogClose,
  DialogContainer,
  DialogContent,
  DialogSubtitle,
  DialogTitle,
  DialogTrigger,
} from '@/components/animated/dialog';
import BasicTooltip from '@/components/basic-tooltip';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import responsivePx from '@/lib/responsive-px';
import { Thesis } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ColumnDef, Row, Table } from '@tanstack/react-table';
import { HTMLMotionProps, motion } from 'framer-motion';
import { Dot, X } from 'lucide-react';
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
      enableHiding: accessorKey === 'abstract' ? false : undefined,
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
  const abstract = row.getValue('abstract') as string;

  return (
    <div className="flex gap-1 text-pretty p-4 text-left">
      <Checkbox
        className="my-auto ml-1"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={`Select ${title}`}
      />

      <Dialog
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 24,
        }}
      >
        <DialogTrigger className="flex size-full flex-col gap-2 p-2">
          <DialogTitle className="text-base font-bold text-secondary">
            <h3 className="line-clamp-3 text-ellipsis whitespace-normal">
              {title}
            </h3>
          </DialogTitle>
          <DialogSubtitle className="flex flex-col space-y-1">
            <ul className="gap-1 text-xs font-semibold">
              {authors.map((author, i) => (
                <li key={i} className="hover:underline">
                  {author}
                  {i !== authors.length - 1 && <span>,</span>}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-1 text-sm xs:flex-row xs:items-center">
              <span>{year}</span>
              <Dot
                size="1.5rem"
                aria-hidden="true"
                className="hidden shrink-0 xs:block"
              />
              <span>{department}</span>
            </div>
          </DialogSubtitle>
          <Button
            variant="outline"
            className="size-fit rounded-full border-secondary px-2 py-1 text-xs text-secondary hover:bg-secondary hover:text-secondary-foreground"
          >
            Request PDF
          </Button>
        </DialogTrigger>
        <DialogContainer>
          <DialogContent className="relative m-5 h-auto w-full max-w-lg rounded-xl border bg-card">
            <ScrollArea className="h-[80vh] p-5" type="scroll">
              <DialogTitle className="p-1 text-lg font-bold text-secondary">
                <h3 className="line-clamp-3 text-ellipsis whitespace-normal">
                  {title}
                </h3>
              </DialogTitle>
              <DialogSubtitle>
                <ul className="flex gap-2 px-1 text-xs font-semibold">
                  {authors.map((author, i) => (
                    <li key={i}>
                      {author}
                      {i !== authors.length - 1 && <span>,</span>}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-row items-center gap-1 px-1 text-sm">
                  <span>{year}</span>
                  <Dot
                    size="1.5rem"
                    aria-hidden="true"
                    className="hidden shrink-0 xs:block"
                  />
                  <span>{department}</span>
                </div>
                <section className="mt-6">
                  <h4 className="text-base">Abstract</h4>
                  <p className="text-justify indent-8 text-sm">{abstract}</p>
                </section>
              </DialogSubtitle>
            </ScrollArea>
            <DialogClose className="text-muted-foreground" />
          </DialogContent>
        </DialogContainer>
      </Dialog>
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
    <div className="p-4">
      {Array.isArray(rowValue) && (
        <motion.ul
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.22 }}
          className="flex list-outside list-disc flex-col gap-2 text-pretty pl-5"
        >
          {rowValue.map((value, i) => (
            <li key={i} className="pl-1">
              {value}
            </li>
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
    </div>
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
        <BasicTooltip label="Remove column">
          <Button
            size="icon"
            variant="ghost"
            aria-label="Remove column"
            className="size-fit p-1 text-muted-foreground hover:bg-transparent hover:text-foreground"
            onClick={handleClick}
          >
            <X aria-hidden="true" />
          </Button>
        </BasicTooltip>
      }
    </motion.div>
  );
}
