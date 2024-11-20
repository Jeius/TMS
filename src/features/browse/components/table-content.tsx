'use client';

import { Button } from '@/components/ui/button';
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
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useScrollState } from '../lib/hooks/use-scroll-events';
import { useSticky } from '../lib/hooks/use-sticky';
import useThesisTable from '../lib/hooks/use-thesis-table';
import { columns } from './table-columns';

export default function ThesesTableContent() {
  const scrollAreaRef = useSticky('app-header', 'thead');
  const scrollButtonsRef = useSticky('app-header', 'div');
  const scrollState = useScrollState(
    'data-radix-scroll-area-viewport',
    scrollAreaRef
  );
  const [scrollArea, setScrollArea] = useState<HTMLElement | null>(null);

  const canScrollLeft = scrollState.left.isScrolled;
  const canScrollRight =
    scrollState.left.value <
    (scrollArea?.scrollWidth ?? 0) - (scrollArea?.clientWidth ?? 0);

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

  function scrollRight() {
    scrollArea?.scrollBy({ left: 300, behavior: 'smooth' });
  }

  function scrollLeft() {
    scrollArea?.scrollBy({ left: -300, behavior: 'smooth' });
  }

  useEffect(
    () => setScrollArea(document.getElementById('scroll-area-viewport')),
    []
  );

  return (
    <ScrollArea
      ref={scrollAreaRef}
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
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-black/10 dark:from-black/40">
        <div ref={scrollButtonsRef} className="relative size-full">
          <div className="sticky top-24 flex flex-col items-end justify-between space-y-5 pr-5">
            <Button
              size="icon"
              variant={canScrollLeft ? 'shine' : undefined}
              aria-disabled={!canScrollLeft}
              disabled={!canScrollLeft}
              className="pointer-events-auto size-fit rounded-full p-2 [&_svg]:size-7"
              onClick={scrollLeft}
            >
              <ArrowLeft />
            </Button>
            <Button
              size="icon"
              variant={canScrollRight ? 'shine' : undefined}
              aria-disabled={!canScrollRight}
              disabled={!canScrollRight}
              className="pointer-events-auto size-fit rounded-full p-2 [&_svg]:size-7"
              onClick={scrollRight}
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
