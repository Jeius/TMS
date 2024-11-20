'use client';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AnimatedTableCell,
  AnimatedTableHead,
} from '@/features/browse/components/animated-table-elements';
import { ColumnVisibilityControl } from '@/features/browse/components/column-visibility';
import { useMemo } from 'react';
import { useScrollEvents } from '../lib/hooks/use-scroll-events';
import { useStickyTHead } from '../lib/hooks/use-sticky-thead';
import useThesisTable from '../lib/hooks/use-thesis-table';
import { columns } from './table-columns';

export default function ThesesTableContent() {
  const scope = useStickyTHead('app-header');
  const scrollState = useScrollEvents('data-radix-scroll-area-viewport', scope);

  const table = useThesisTable();
  const headers = table.getFlatHeaders();
  const colSizing = table.getState().columnSizing;

  const columnSizeVars = useMemo(() => {
    const colSizes: { [key: string]: number } = {};
    headers.forEach((header) => {
      colSizes[`--header-${header.id}-size`] = colSizing[header.id];
      colSizes[`--col-${header.column.id}-size`] = colSizing[header.id];
    });
    return colSizes;
  }, [headers, colSizing]);

  return (
    <ScrollArea
      ref={scope}
      className="max-w-fit scroll-smooth whitespace-nowrap"
    >
      <div className="flex text-sm">
        <Table
          className="relative border-separate border-spacing-0 whitespace-normal sm:static"
          style={{
            ...columnSizeVars,
            width: table.getTotalSize(),
          }}
        >
          <TableHeader className="sticky top-0 z-10 text-xs hover:bg-transparent">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-0 align-top hover:bg-transparent"
              >
                <AnimatedTableHead
                  headers={headerGroup.headers}
                  scrollState={scrollState}
                />
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="align-top hover:bg-transparent"
                >
                  <AnimatedTableCell row={row} scrollState={scrollState} />
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No records.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide() && !column.getIsVisible())
          .length ? (
          <div className="z-10 block border-y border-l bg-card/80 pr-8 lg:pr-16">
            <ColumnVisibilityControl type="column" />
          </div>
        ) : null}
      </div>
      <ScrollBar orientation="horizontal" className="z-10" />
    </ScrollArea>
  );
}
